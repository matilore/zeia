import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthFormUi from 'components/AuthFormUi';

class AuthForm extends React.Component {
  state = {
    buttonMessage: '',
    username: '',
    password: ''
  };

  componentWillReceiveProps(nextProps) {
    const buttonMessage = nextProps.authAction === 'signin' ? 'Signin' : 'Create Account';
    this.setState({ buttonMessage });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.makeCall({ username, password }, this.props.authAction);
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { isShowModal, hideAuthModal, notification } = this.props;
    const { handleSubmit, handleInputChange } = this;
    return (
      <div>
        {isShowModal && (
          <AuthFormUi
            notification={notification}
            buttonMessage={this.state.buttonMessage}
            hideAuthModal={hideAuthModal}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isShowModal: state.user.auth.showModal,
  authAction: state.user.auth.authAction,
  notification: state.user.auth.notification
});

const mapDispachToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(AuthForm);
