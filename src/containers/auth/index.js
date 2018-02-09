import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormUi from './formUi';

class Auth extends React.Component {
  state = { buttonMessage: '' };

  componentWillReceiveProps(nextProps) {
    const buttonMessage = nextProps.authAction === 'signin' ? 'Signin' : 'Create Account';
    this.setState({ buttonMessage });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.makeCall(this.state, this.props.authAction);
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { isShowModal, hideAuthModal } = this.props;
    const { handleSubmit, handleInputChange } = this;
    return (
      <div>
        {isShowModal && (
          <FormUi
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
  isShowModal: state.auth.showModal,
  authAction: state.auth.authAction
});

const mapDispachToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(Auth);
