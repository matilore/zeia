import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import icon from 'images/lens.svg';
import price from 'images/price.png';
import change2 from 'images/change2.png'
import marketcap from 'images/marketcap.png'
import moveCursorToEnd from 'helpers/styleHelpers'
import textFormatter from 'helpers/textHelper'
import Socket from 'helpers/Socket';


const socket = new Socket('https://streamer.cryptocompare.com/');
const BASE_URL_IMAGES = 'https://www.cryptocompare.com/'

const blinker = keyframes`
    0%   { border-bottom-color: rgba(79, 207, 71, 1); }
    50%  { border-bottom-color: rgba(79, 207, 71, 0); }
    100% { border-bottom-color: rgba(79, 207, 71, 1); }
`

const Wrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin-top: 2%;
`;

const Results = styled.div`
    width: 100%;
    display:flex;
    justify-content: center;
    margin-top: 20px;
    height: 70%;
`;

const Ul = styled.ul`
    width: 80%;
    margin: 0;
    padding: 0;
`;

const Image = styled.div`
    width: auto;
    background-image: ${(props) => props.src};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const InputWrapper = styled.div`
    height: 2.5em;
    display:flex;
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
    font-family: 'Orbitron', sans-serif;
    color: transparent;
    text-shadow: 0 0 0 #2196f3;
    outline: none;
    border-bottom: 4px solid transparent;
    &:focus {
        animation: ${blinker} 2s linear infinite;
    }
`

const Li = styled.li`
    list-style-type: none;
    display: flex;
    margin: 0px 35px 20px 35px;
    line-height: 1.5em;
    width: 90%;
    background: ${props => props.selected ? 'rgb(40, 95, 161)' : 'transparent'};
    color: ${props => props.selected ? 'white' : 'rgb(244, 223, 246)'}
`;

const Result = styled.div`
  font-family: 'Iceland', cursive;
  font-size: 50px;
  height: 150px;
  display: flex;
  justify-content: center;
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
            value: '',
            cursor: 0,
            result: {},
            filteredCoins: []
        }
    }

    calculatePrice = (result) => {
        axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=EUR`)
            .then((response) => {
                const formattedResponse = response.data.DISPLAY.BTC.EUR;
                let price = formattedResponse.PRICE;
                price = price.slice(2, price.length - 1);
                price = price.split(',').join('');
                price = parseFloat(price);
                price = parseFloat(result.PRICE * price).toFixed(4);

                this.setState({ result: { ...this.state.result, price, change24: result.CHANGE24HOURPCT } })

            })
            .catch(function (error) {
                console.log(error);
            });
    }



    setResult = (result, convertTo) => {
        console.log(convertTo);
        convertTo === 'BTC' ? this.calculatePrice(result) : this.setState({ result: { ...this.state.result, price: result.PRICE, change24: result.CHANGE24HOURPCT } });
    };


    filterCoins = (input) => (
        this.props.allCoins.filter((coin) => (
            coin.label.toLowerCase().includes(input.toLowerCase()) ||
            coin.name.toLowerCase().includes(input.toLowerCase())
        )).slice(0, 10)
    )

    handleChange = (event) => {
        const input = event.target.value;
        const { cursor, filteredCoins } = this.state;
        if (event.key === 'ArrowUp' && cursor > 0) {
            moveCursorToEnd(event.target);
            this.setState(prevState => ({
                cursor: prevState.cursor - 1
            }))
        } else if (event.key === 'ArrowDown' && cursor < filteredCoins.length - 1) {
            this.setState(prevState => ({
                cursor: prevState.cursor + 1
            }))
        } else if (event.key === 'Enter') {
            const selectedCoin = filteredCoins[cursor].name;
            this.selectValue(selectedCoin)
        } else if (input !== '') {
            const filteredCoins = this.filterCoins(input);
            this.setState({ value: input, filteredCoins })
        } else {
            socket.unsubscribe();
            this.setState({ value: input, result: {}, cursor: 0 })
        }
    }

    selectValue = (selection) => {
        socket.unsubscribe();
        const coin = typeof selection === 'string' ? selection : selection.target.getAttribute('data-name');
        socket.emit(coin, this.setResult);
        axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=EUR`)
            .then((response) => {
                const formattedResponse = response.data.DISPLAY[coin].EUR;
                const change24 = formattedResponse.CHANGEPCT24HOUR
                const price = formattedResponse.PRICE;
                let mrkcap = formattedResponse.MKTCAP;
                mrkcap = textFormatter(mrkcap);
                this.setState({ result: { ...this.state.result, mrkcap } })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changeCursor = (event) => {
        this.setState({ cursor: Number(event.target.id) })
    }


    render() {
        const { cursor, filteredCoins, result } = this.state;
        const Brain = this;
        return (
            <Wrapper>
                <InputWrapper>
                    <Icon />
                    <Input
                        placeholder='Type the crypto name...'
                        onKeyUp={this.handleChange} />
                </InputWrapper>
                {
                    this.state.value != '' &&
                    <Results>
                        <Ul>
                            {
                                filteredCoins.map((coin, index) => {
                                    return (cursor === index ?
                                        (
                                            <Li
                                                key={coin.name}
                                                data-name={coin.name}
                                                selected id={index}
                                                onClick={this.selectValue}>
                                                <CoinIcon src={coin.image} />{coin.label} ({coin.name})</Li>
                                        ) : (
                                            <Li
                                                key={coin.name}
                                                data-name={coin.name}
                                                onMouseOver={this.changeCursor}
                                                id={index}
                                                onClick={this.selectValue}>
                                                <CoinIcon src={coin.image} />{coin.label} ({coin.name})</Li>
                                        )
                                    )
                                })
                            }
                        </Ul>
                    </Results>
                }
                {
                    Object.keys(result).length !== 0 &&
                    <Result>
                        <InfoIconWrapper><InfoIcon src={price} />Price: <br />{result.price}</InfoIconWrapper>
                        <InfoIconWrapper><InfoIcon src={change2} />24h trend: <br />{result.change24}</InfoIconWrapper>
                        <InfoIconWrapper><InfoIcon src={marketcap} />Market cap: <br />{result.mrkcap}</InfoIconWrapper>
                    </Result>
                }
            </Wrapper>
        )
    }
}

export default Autocomplete

