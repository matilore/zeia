import React from 'react';
import styled from 'styled-components';

import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Chart from 'components/Chart';
import LineChart from 'components/LineChart';

const BalanceWrapper = styled.div`
  width: 100%;
  background-color: lightgray;
  height: 8vh;
  border-bottom: 1px solid white;
`;

const InfoGraphsWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 30vh;
  display: flex;
`;

const InfoGraphsSection = styled.div`
  width: 50%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 30vh;
`;

const ChartWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 50vh;
  display: flex;
`;

class User extends React.Component {
  state = {};
  render() {
    const { coins } = this.props.userInfo ? this.props.userInfo : [];
    return (
      <div>
        <BalanceWrapper />
        <InfoGraphsWrapper>
          <InfoGraphsSection>
            <Chart data={coins} />
          </InfoGraphsSection>
          <InfoGraphsSection>
            <div>infographs here</div>
          </InfoGraphsSection>
        </InfoGraphsWrapper>
        {/* <ChartWrapper>
          <LineChart data={coins} />
        </ChartWrapper> */}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => user;

const mapDispachToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(User);
