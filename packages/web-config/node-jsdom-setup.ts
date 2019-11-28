import mockRequire from 'mock-require'
import { JSDOM } from 'jsdom'
import * as ansiEscapes from 'ansi-escapes'
import enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import ChaiEnzyme from 'chai-enzyme'

declare global {
  module NodeJS {
    interface Global {
      [key: string]: any
    }
  }
}

interface RegisterDeps {
  enzyme: typeof enzyme
  EnzymeAdapter: typeof EnzymeAdapter
  chaiEnzyme: typeof ChaiEnzyme
}

type TimeoutID = number

export const register = ({
  enzyme,
  EnzymeAdapter,
  chaiEnzyme,
}: RegisterDeps) => {
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
  const { window } = jsdom

  const chai = require('chai')
  const sinonChai = require('sinon-chai')
  // const chaiEnzyme = require('chai-enzyme')

  global.window = window
  global.document = window.document;

  // DOMWindow doesn't have Selection yet.
  (window as any).Selection = { prototype: { isCollapsed: {} } }

  global.navigator = {
    userAgent: 'node.js',
  }

  global.requestAnimationFrame = function (callback: ((...args: any[]) => void)) {
    return setTimeout(callback, 0)
  }

  global.cancelAnimationFrame = function (id: TimeoutID) {
    clearTimeout(id)
  }

  Object.keys(window.document.defaultView as Record<string, any>).forEach((property) => {
    if (
      property === 'localStorage' ||
    property === 'sessionStorage' ||
    typeof global[property] !== 'undefined'
    ) return

    global[property] = (window.document.defaultView as Record<string, any>)[property]
  })

  // enzyme, and therefore chai-enzyme, needs to be required after
  // global.navigator is set up (https://github.com/airbnb/enzyme/issues/395)

  enzyme.configure({ adapter: new EnzymeAdapter() })

  chai.use(chaiEnzyme())
  chai.use(sinonChai)
  global.expect = chai.expect

  const bresolve = require('browser-resolve')
  const Module = require('module')

  const overrideRequire = () => {
    const _load = Module._load

    Module._load = function (...args: any[]) {
      let browserPkg = args

      // Follow browser-field spec for importing modules
      if (!['path'].includes(args[0])) {
        try {
          browserPkg = [bresolve.sync.apply(this, args)]
        } catch (e) {
          null
        }
      }

      // Stub out all webpack-specific imports
      if (args[0].includes('!')) {
        return {}
      }

      const ret = _load.apply(this, browserPkg)

      return ret
    }
  }

  overrideRequire()
}

// eslint-disable-next-line
after(() => {
  process.stdout.write(ansiEscapes.cursorShow)
})

export const returnMockRequire = (name: string, modExport: object = {}) => {
  mockRequire(name, modExport)

  return require(name)
}
