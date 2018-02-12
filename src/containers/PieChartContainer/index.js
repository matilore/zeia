import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { PieChart, Pie, Legend, Cell, Sector } from 'recharts';
import PieChartUi from 'components/PieChartUi';

import colors from 'styles/colors';

const enlargeChart = keyframes`
      0% { width: 50%}
    100% { width: 100% }
`;
const reduceChart = keyframes`
    0%   { width: 100%}
    100% { width: 50% }
`;

const StyledSector = styled(Sector)`
  &:hover {
    cursor: pointer;
  }
`;
const ChartWrapper = styled.div`
  display: inline-block;
  width: 100%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 200px;
  animation: ${props =>
    (props.showDetails === undefined
      ? 'no'
      : props.showDetails ? `${reduceChart} 1s linear` : `${enlargeChart} 1s linear`)};
  animation-fill-mode: forwards;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class PieChartContainer extends React.Component {
  state = {
    activeIndex: undefined,
    lastActiveIndex: undefined
  };

  onActivePie = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  onPieLeave = (data, index) => {
    if (!this.state.clicked) {
      this.setState({
        activeIndex: undefined
      });
    } else {
      this.setState({
        activeIndex: this.state.lastActiveIndex
      });
    }
  };

  renderActiveShape = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill
    } = props;

    return (
      <g>
        <StyledSector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          fillOpacity={0.5}
        />
      </g>
    );
  };

  clickForInfo = (props, currentIndex, selectCoin) => {
    const { name, label, image } = props;
    if (currentIndex === this.state.lastActiveIndex && this.state.clicked === true) {
      this.setState({
        activeIndex: undefined,
        lastActiveIndex: currentIndex,
        clicked: !this.state.clicked
      });
      this.props.deselectActiveCoin();
    } else {
      this.setState({
        activeIndex: currentIndex,
        lastActiveIndex: currentIndex,
        clicked: true
      });
      selectCoin({ name, label, image });
    }
  };

  render() {
    const props = {
      activeIndex: this.state.activeIndex,
      renderActiveShape: this.renderActiveShape,
      data: this.props.data,
      selectCoin: this.props.selectCoin,
      onActivePie: this.onActivePie,
      onPieLeave: this.onPieLeave,
      clickForInfo: this.clickForInfo
    };

    return (
      <ChartWrapper showDetails={this.props.showDetails}>
        <CenterWrapper>
          <PieChartUi {...props} />
        </CenterWrapper>
      </ChartWrapper>
    );
  }
}

export default PieChartContainer;
