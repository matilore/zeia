import React from 'react'
import axios from 'axios'
import styled, { keyframes } from 'styled-components'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import { max } from 'underscore'
import moment from 'moment'

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { data } = this.props

    return (
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="close" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey='time'/>
        <YAxis domain={[0, maxValue]}/>
      </LineChart>
    )
  }
}

export default Chart
