import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as styles from './index.scss';

import Test from '@components/Test/index'

const render = () => {
  ReactDOM.render(
    <div className={styles.test}>
      <Test></Test>
    </div>,
    document.querySelector('#app')
  )
}

render()