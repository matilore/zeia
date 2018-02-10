import React from 'react';
import styled from 'styled-components';

import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Chart from 'components/Chart';

const BalanceWrapper = styled.div`
  width: 100%;
  background-color: lightgray;
  height: 10vh;
  border-bottom: 1px solid white;
`;

const InfoGraphsWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 40vh;
`;

class User extends React.Component {
  state = {};
  render() {
    const { coins } = this.props.currentUser ? this.props.currentUser : [];
    return (
      <div>
        <BalanceWrapper />
        <InfoGraphsWrapper>
          <Chart data={coins} />
        </InfoGraphsWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({ currentUser: auth.currentUser, user });

const mapDispachToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(User);
