import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthForm from 'containers/AuthForm';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Orbitron', sans-serif;
  color: rgb(244, 223, 246);
`;

class Landing extends React.Component {
  state = {};

  componentDidMount = () => {};

  render() {
    return <AuthForm />;
  }
}

const mapStateToProps = state => ({});

const mapDispachToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(Landing);
