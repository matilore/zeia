import React from 'react'
import ReactDom from 'react-dom'
import Routes from './config/routes'

import './index.scss'

ReactDom.render(
  <Routes />, document.getElementById('app')
)
