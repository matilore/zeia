import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import icon from 'images/lens.svg';
import priceImage from 'images/price.png';
import change2 from 'images/change2.png';
import marketcap from 'images/marketcap.png';
import moveCursorToEnd from 'helpers/styleHelpers';
import textFormatter from 'helpers/textHelper';
import Chart from 'components/Chart';

// redux
import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const BASE_URL_IMAGES = 'https://www.cryptocompare.com/';

const blinker = keyframes`
    0%   { border-bottom-color: rgba(79, 207, 71, 1); }
    50%  { border-bottom-color: rgba(79, 207, 71, 0); }
    100% { border-bottom-color: rgba(79, 207, 71, 1); }
`;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin-top: 10%;
`;

const Results = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  height: 70%;
`;

const Ul = styled.ul`
  width: 80%;
  margin: 0;
  padding: 0;
`;

const InputWrapper = styled.div`
  height: 2.5em;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 22px;
  height: 17px;
  position: relative;
  left: calc(5% + 2px);
  background: url(${icon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Input = styled.input`
  width: 100%;
  height: 2em;
  padding-left: 8%;
  line-height: 1.5em;
  font-size: 1.2em;
  color: transparent;
  text-shadow: 0 0 0 #2196f3;
  outline: none;
  border-bottom: 4px solid transparent;
  &:focus {
    animation: ${blinker} 2s linear infinite;
  }
`;

const Li = styled.li`
  list-style-type: none;
  display: flex;
  margin: 0px 35px 20px 35px;
  line-height: 1.5em;
  width: 90%;
  background: ${props => (props.selected ? 'rgb(40, 95, 161)' : 'transparent')};
  color: ${props => (props.selected ? 'white' : 'rgb(244, 223, 246)')};
`;

const Result = styled.div`
  font-family: 'Iceland', cursive;
  font-size: 50px;
  height: 150px;
  display: flex;
  justify-content: center;
  margin: 100px;
`;

const CoinIcon = styled.div`
  width: 22px;
  height: 20px;
  position: relative;
  margin-right: 10px;
  background: url(${BASE_URL_IMAGES}${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const InfoIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 0.6em;
  color: white;
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin-right: 10px;
  background: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

class Autocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      cursor: 0
    };
  }

  handleChange = (event) => {
    const {
      filterCoins,
      filteredCoins,
      selectCoin,
      unsubscribeSocket,
      allCoins,
      setResult,
      reset
    } = this.props;

    const input = event.target.value;
    const { cursor } = this.state;
    if (event.key === 'ArrowUp' && cursor > 0) {
      moveCursorToEnd(event.target);
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (event.key === 'ArrowDown' && cursor < filteredCoins.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    } else if (event.key === 'Enter') {
      const selectedCoin = filteredCoins[cursor].name;
      selectCoin(selectedCoin, setResult);
    } else if (input !== '') {
      filterCoins(allCoins, input);
    } else {
      reset();
    }
  };

  changeCursor = (event) => {
    this.setState({ cursor: Number(event.target.id) });
  };

  render() {
    const { cursor } = this.state;
    const { filteredCoins, inputValue, result } = this.props;
    return (
      <Wrapper>
        <InputWrapper>
          <Icon />
          <Input placeholder="Type the crypto name..." onKeyUp={this.handleChange} />
        </InputWrapper>
        {inputValue !== '' && (
          <Results>
            <Ul>
              {filteredCoins.map((coin, index) =>
                  (cursor === index ? (
                    <Li
                      key={coin.name}
                      data-name={coin.name}
                      selected
                      id={index}
                      onClick={this.selectValue}
                    >
                      <CoinIcon src={coin.image} />
                      {coin.label} ({coin.name})
                    </Li>
                  ) : (
                    <Li
                      key={coin.name}
                      data-name={coin.name}
                      onMouseOver={this.changeCursor}
                      onFocus={this.changeCursor}
                      id={index}
                      onClick={this.selectValue}
                    >
                      <CoinIcon src={coin.image} />
                      {coin.label} ({coin.name})
                    </Li>
                  )))}
            </Ul>
          </Results>
        )}
        {Object.keys(result).length === 3 && (
          <Result>
            <InfoIconWrapper>
              <InfoIcon src={priceImage} />Price: <br />
              {result.price}€
            </InfoIconWrapper>
            <InfoIconWrapper>
              <InfoIcon src={change2} />24h trend: <br />
              {result.change24}
            </InfoIconWrapper>
            <InfoIconWrapper>
              <InfoIcon src={marketcap} />Market cap: <br />
              {result.mrkcap}
            </InfoIconWrapper>
          </Result>
        )}
      </Wrapper>
    );
  }
}

Autocomplete.propTypes = {
  allCoins: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = ({ autocomplete }) => autocomplete;

const mapDispachToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(Autocomplete);
