import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Auth from 'containers/auth';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Orbitron', sans-serif;
  color: rgb(244, 223, 246);
`;

class Home extends React.Component {
  state = {};

  componentDidMount = () => {};

  render() {
    return <Auth />;
  }
}

const mapStateToProps = ({ autocomplete }) => {
  return autocomplete;
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
