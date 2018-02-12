import React from 'react';
import styled, { keyframes } from 'styled-components';

import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PieChartContainer from 'containers/PieChartContainer';
import CoinInfo from 'components/CoinInfo';
import PieChartUi from 'components/PieChartUi';

const CoinDetailsWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 200px;
  display: block;
`;

class CoinDetails extends React.Component {
  render() {
    const { coins } = this.props.userInfo ? this.props.userInfo : [];
    const {
      showDetails,
      selectUserCoin,
      setCoinResult,
      deselectActiveCoin,
      activeCoinInfo
    } = this.props;

    return (
      <CoinDetailsWrapper>
        <PieChartContainer
          showDetails={showDetails}
          selectUserCoin={this.props.selectUserCoin}
          setCoinResult={this.props.setCoinResult}
          deselectActiveCoin={this.props.deselectActiveCoin}
          data={coins}
        />
        {showDetails && <CoinInfo showDetails={showDetails} activeCoinInfo={activeCoinInfo} />}
      </CoinDetailsWrapper>
    );
  }
}

const mapStateToProps = ({ user, infoGraph }) => ({
  ...user,
  ...infoGraph
});

const mapDispachToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(CoinDetails);
