import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

import colors from 'styles/colors';

const BASE_URL_IMAGES = 'https://www.cryptocompare.com/';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TitleWrapper = styled.div`
  justify-content: center;
  display: flex;
  height: 50px;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin-right: 10px;
  background: url(${BASE_URL_IMAGES}${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.p`
  font-size: 2em;
`;

class InfoGraph extends React.Component {
  render() {
    const {
      change24, price, mrkcap, label, image
    } = this.props.activeCoinInfo;
    return (
      <MainWrapper>
        <TitleWrapper>
          <CoinIcon src={image} />
          <Title>{label}</Title>
        </TitleWrapper>

        <p>{change24}</p>
        <p>{price}</p>
        <p>{mrkcap}</p>
      </MainWrapper>
    );
  }
}

export default InfoGraph;
