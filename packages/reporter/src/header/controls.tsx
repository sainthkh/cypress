import cs from 'classnames'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
// @ts-ignore
import Tooltip from '@cypress/react-tooltip'

import defaultEvents, { Events } from '../lib/events'
import { AppState } from '../lib/app-state'

const ifThen = (condition: boolean, component: React.ReactNode) => (
  condition ? component : null
)

interface Props {
  events?: Events
  appState: AppState
}

const Controls = observer(({ events = defaultEvents, appState }: Props) => {
  const emit = (event: string) => () => events.emit(event)
  const toggleAutoScrolling = () => {
    appState.toggleAutoScrolling()
    events.emit('save:state')
  }

  return (
    <div className='controls'>
      {ifThen(appState.isPaused, (
        <span className='paused-label'>
          <label>Paused</label>
        </span>
      ))}
      {ifThen(appState.isPaused, (
        <Tooltip placement='bottom' title={<p>Resume <span className='kbd'>C</span></p>} className='cy-tooltip'>
          <button aria-label='Resume' className='play' onClick={emit('resume')}>
            <i className='fas fa-play' />
          </button>
        </Tooltip>
      ))}
      {ifThen(!appState.isPaused, (
        <Tooltip placement='bottom' title={<p>{appState.autoScrollingEnabled ? 'Disable' : 'Enable'} Auto-scrolling <span className='kbd'>A</span></p>} className='cy-tooltip'>
          <button
            aria-label={`${appState.autoScrollingEnabled ? 'Disable' : 'Enable'} Auto-scrolling`}
            className={cs('toggle-auto-scrolling', { 'auto-scrolling-enabled': appState.autoScrollingEnabled })}
            onClick={action('toggle:auto:scrolling', toggleAutoScrolling)}
          >
            <i />
            <i className='fas fa-arrows-alt-v' />
          </button>
        </Tooltip>
      ))}
      {ifThen(appState.isRunning && !appState.isPaused, (
        <Tooltip placement='bottom' title={<p>Stop Running <span className='kbd'>S</span></p>} className='cy-tooltip' visible={appState.studioActive ? false : null}>
          <button aria-label='Stop' className='stop' onClick={emit('stop')} disabled={appState.studioActive}>
            <i className='fas fa-stop' />
          </button>
        </Tooltip>
      ))}
      {ifThen(!appState.isRunning, (
        <Tooltip placement='bottom' title={<p>Run All Tests <span className='kbd'>R</span></p>} className='cy-tooltip'>
          <button aria-label='Rerun all tests' className='restart' onClick={emit('restart')}>
            <i className={appState.studioActive ? 'fas fa-undo' : 'fas fa-redo'} />
          </button>
        </Tooltip>
      ))}
      {ifThen(!!appState.nextCommandName, (
        <Tooltip placement='bottom' title={<p>Next <span className='kbd'>[N]:</span>{appState.nextCommandName}</p>} className='cy-tooltip'>
          <button aria-label={`Next '${appState.nextCommandName}'`} className='next' onClick={emit('next')}>
            <i className='fas fa-step-forward' />
          </button>
        </Tooltip>
      ))}
    </div>
  )
})

export default Controls
