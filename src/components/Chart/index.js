import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { PieChart, Pie, Legend, Cell, Sector } from 'recharts';
import { max } from 'underscore';
import moment from 'moment';

import colors from 'styles/colors';

class Chart extends React.Component {
  state = {
    activeIndex: 0
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { data } = this.props;
    return (
      <PieChart width={800} height={400}>
        {data && (
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            dataKey="value"
            nameKey="name"
            cx="30%"
            cy="30%"
            outerRadius={80}
            onMouseEnter={this.onPieEnter}
          >
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
          </Pie>
        )}
        <Legend
          wrapperStyle={{ fontSize: 14, marginLeft: '5%', padding: '2px' }}
          iconSize={10}
          align="left"
          verticalAlign="middle"
          layout="vertical"
          height={250}
        />
      </PieChart>
    );
  }
}

const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default Chart;
