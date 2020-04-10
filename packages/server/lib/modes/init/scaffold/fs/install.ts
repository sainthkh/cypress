import fs from '../../../../util/fs'
import { spawn } from './spawn'
import { log } from './log'
import { join } from 'path'
import { InitConfig } from '../../types'

export const installPackages = async (projRoot: string, config: InitConfig) => {
  const packages: string[] = []

  if (config.typescript) {
    packages.push('typescript')
  }

  if (config.eslint === undefined) {
    packages.push('eslint', 'eslint-plugin-cypress')
  }

  if (config.chaiFriendly) {
    packages.push('eslint-plugin-chai-friendly')
  }

  if (packages.length === 0) {
    log('Nothing to install.')

    return
  }

  const yarn = await isYarn(projRoot)

  if (yarn) {
    await spawn('yarn', ['add', '--dev', ...packages], {
      stdio: 'inherit',
      cwd: projRoot,
    })
  } else {
    await spawn('npm', ['i', '-D', ...packages], {
      stdio: 'inherit',
      cwd: projRoot,
    })
  }
}

export const isYarn = async (projRoot: string) => {
  return new Promise((resolve) => {
    fs.access(join(projRoot, 'yarn.lock'), fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)

        return
      }

      resolve(true)
    })
  })
}
