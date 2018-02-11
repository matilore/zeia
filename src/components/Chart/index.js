import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { PieChart, Pie, Legend, Cell, Sector } from 'recharts';

import colors from 'styles/colors';

const StyledSector = styled(Sector)`
  &:hover {
    cursor: pointer;
  }
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class Chart extends React.Component {
  state = {
    activeIndex: undefined
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  onPieLeave = (data, index) => {
    this.setState({
      activeIndex: undefined
    });
  };

  fetchInfo = (props, selectUserCoin) => {
    const { name, label, image } = props;
    selectUserCoin({ name, label, image }, this.props.setCoinResult);
  };

  render() {
    const { data, selectUserCoin } = this.props;
    return (
      <ChartWrapper>
        <PieChart width={800} height={300}>
          {data && (
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="35%"
              outerRadius={80}
              onMouseEnter={this.onPieEnter}
              onMouseLeave={this.onPieLeave}
              onClick={props => this.fetchInfo(props, selectUserCoin)}
            >
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
            </Pie>
          )}
          <Legend
            wrapperStyle={{ fontSize: 14, position: 'absolute', left: '30%' }}
            iconSize={10}
            align="left"
            verticalAlign="middle"
            layout="vertical"
            height={150}
          />
        </PieChart>
      </ChartWrapper>
    );
  }
}

const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill
  } = props;

  return (
    <g>
      <StyledSector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <StyledSector
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
