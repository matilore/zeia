import React from 'react';
import styled from 'styled-components';

const NavBarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgb(55, 62, 81);
  height: 80px;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5%;
  height: 3em;
  width: 20%;
  margin-right: 2%;
  font-family: inherit;
  color: #fff;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'inherit'};
  &:hover {
    color: ${(props) => (props.doHover ? 'rgb(40, 95, 161)' : 'none')};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 1.5em;
  padding-left: 30px;
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.doHover ? 'rgb(40, 95, 161)' : 'none')};
  }
`;

class Navbar extends React.Component {
  state = {};
  render() {
    return (
      <NavBarWrapper>
        <LogoWrapper>
          <Logo doHover>Zeia</Logo>
        </LogoWrapper>
        <ButtonsWrapper>
          <Button backgroundColor={'rgb(40, 95, 161)'}>Signup</Button>
          <Button doHover>Signin</Button>
        </ButtonsWrapper>
      </NavBarWrapper>
    );
  }
}

export default Navbar;
