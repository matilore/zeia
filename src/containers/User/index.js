import React from 'react';
import styled, { keyframes } from 'styled-components';

import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Chart from 'components/Chart';
import InfoGraph from 'components/InfoGraph';

const reduce = keyframes`
    0%   { width: 100%}
    100% { width: 50% }
`;

const enlarge = keyframes`
      0% { width: 50%}
    100% { width: 100% }
`;

const BalanceWrapper = styled.div`
  width: 100%;
  background-color: lightgray;
  height: 8vh;
  border-bottom: 1px solid white;
`;

const InfoWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 30vh;
  display: flex;
`;

const InfoChartWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 30vh;
  animation: ${props =>
    (props.showDetails === undefined
      ? 'no'
      : props.showDetails ? `${reduce} 1s linear` : `${enlarge} 1s linear`)};
  animation-fill-mode: forwards;
`;

const InfoGraphWrapper = styled.div`
  width: 0%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 30vh;
  animation: ${props =>
    (props.showDetails === undefined
      ? 'no'
      : props.showDetails ? `${enlarge} 1s linear` : `${reduce} 1s linear`)};
  animation-fill-mode: forwards;
`;

class User extends React.Component {
  state = {};

  render() {
    const { coins } = this.props.userInfo ? this.props.userInfo : [];
    const { showDetails, activeCoinInfo } = this.props;
    return (
      <div>
        <BalanceWrapper />
        <InfoWrapper>
          <InfoChartWrapper showDetails={showDetails}>
            <Chart
              selectUserCoin={this.props.selectUserCoin}
              setCoinResult={this.props.setCoinResult}
              data={coins}
            />
          </InfoChartWrapper>
          <InfoGraphWrapper showDetails={showDetails}>
            {showDetails && <InfoGraph showDetails={showDetails} activeCoinInfo={activeCoinInfo} />}
          </InfoGraphWrapper>
        </InfoWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ user, infoGraph }) => ({
  ...user,
  ...infoGraph
});

const mapDispachToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(User);
