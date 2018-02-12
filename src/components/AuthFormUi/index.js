import React, { Component } from 'react';
import styled from 'styled-components';

import closeIcon from 'images/close.svg';

const ModalBackdrop = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 0;
  display: flex;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 13;
  font-family: 'Orbitron', sans-serif;
`;

const ModalBody = styled.div`
  background-color: white;
  height: auto;
  margin: 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 90%;
  margin-bottom: 2em;
  line-height: 1.5em;
  font-size: 0.8em;
  padding: 0.5em;
  font-family: 'Orbitron', sans-serif;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  padding: 0 7px;
  outline: none;
  cursor: pointer;
  border-radius: 5%;
  height: 3em;
  width: 30%;
  font-family: inherit;
  color: #fff;
  background-color: ${props =>
    (props.backgroundColor ? props.backgroundColor : 'rgb(40, 95, 161)')};
  &:hover {
    color: ${props => (props.doHover ? 'rgb(40, 95, 161)' : 'none')};
  }
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  align-self: flex-end;
  position: relative;
  bottom: 10px;
  left: 10px;
  background: url(${closeIcon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 0.5em;
`;

const Notification = styled.p`
  color: ${props => props.color};
  font-size: 0.6em;
  margin-bottom: 2em;
`;

const AuthForm = ({
  hideAuthModal,
  handleInputChange,
  handleSubmit,
  buttonMessage,
  notification
}) => (
  <ModalBackdrop>
    <ModalBody>
      <Icon onClick={hideAuthModal} />
      <FormWrapper onSubmit={handleSubmit}>
        <InputsWrapper>
          <Input placeholder="Username" name="username" type="text" onChange={handleInputChange} />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
          />
          {notification && (
            <Notification color={notification.color}>{notification.message}</Notification>
          )}
        </InputsWrapper>
        <ButtonsWrapper>
          <Button type="submit">{buttonMessage}</Button>
        </ButtonsWrapper>
      </FormWrapper>
    </ModalBody>
  </ModalBackdrop>
);

export default AuthForm;
