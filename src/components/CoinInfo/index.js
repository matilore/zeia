import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

import colors from 'styles/colors';

const BASE_URL_IMAGES = 'https://www.cryptocompare.com/';

const enlargeInfo = keyframes`
      0% { width: 0%}
    100% { width: 50% }
`;
const reduceInfo = keyframes`
    0%   { width: 50%}
    100% { width: 0% }
`;

const InfoWrapper = styled.div`
  display: inline-block;
  width: 0%;
  overflow: hidden;
  background-color: ${props => props.theme.infoGraphBackGround};
  height: 200px;
  animation: ${props =>
    (props.showDetails === undefined
      ? 'no'
      : props.showDetails ? `${enlargeInfo} 1s linear` : `${reduceInfo} 1s linear`)};
  animation-fill-mode: forwards;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primary};
`;
const TitleWrapper = styled.div`
  justify-content: center;
  display: flex;
  height: 50px;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 35px;
  height: 35px;
  position: relative;
  margin-right: 10px;
  background: url(${BASE_URL_IMAGES}${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.p`
  font-size: 1.5em;
`;

class CoinInfo extends React.Component {
  render() {
    const {
      change24, price, mrkcap, label, image
    } = this.props.activeCoinInfo;
    return (
      <InfoWrapper showDetails={this.props.showDetails}>
        <CenterWrapper>
          <TitleWrapper>
            <CoinIcon src={image} />
            <Title>{label}</Title>
          </TitleWrapper>
          <p>{change24}</p>
          <p>{price}</p>
          <p>{mrkcap}</p>
        </CenterWrapper>
      </InfoWrapper>
    );
  }
}

export default CoinInfo;
