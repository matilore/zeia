import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { PieChart, Pie, Legend, Cell, Sector } from 'recharts';

import colors from 'styles/colors';

const PieChartUi = ({
  data,
  selectCoin,
  activeIndex,
  renderActiveShape,
  onActivePie,
  onPieLeave,
  clickForInfo
}) => (
  <PieChart width={400} height={200}>
    {data && (
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        onMouseEnter={onActivePie}
        onMouseLeave={onPieLeave}
        onClick={(props, index) => clickForInfo(props, index, selectCoin)}
      >
        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
      </Pie>
    )}
    <Legend
      wrapperStyle={{ fontSize: 14, position: 'absolute', left: '10%' }}
      iconSize={10}
      align="left"
      verticalAlign="middle"
      layout="vertical"
      height={150}
    />
  </PieChart>
);

export default PieChartUi;
