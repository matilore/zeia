import React from 'react';
import styled, { keyframes } from 'styled-components';

import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CoinDetails from 'containers/CoinDetails';

const BalanceWrapper = styled.div`
  width: 100%;
  background-color: lightgray;
  height: 8vh;
  border-bottom: 1px solid white;
`;

const Dashboard = () => (
  <div>
    <BalanceWrapper />
    <CoinDetails />
  </div>
);

export default Dashboard;
