import React from 'react';
import axios from 'axios';
import styled from 'styled-components'
import icon from 'images/lens.svg'

const BASE_URL_IMAGES = 'https://www.cryptocompare.com/'

const Wrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-items: center;
`;

const Results = styled.div`
    width: 100%;
    position: relative;
    right: 10px;
    margin-top: 20px;
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
    height: 20px;
    position: relative;
    left: 5%;
    background: url(${icon});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const Input = styled.input`
    width: 100%;
    height: 2em;
    padding-left: 6%;
    line-height: 1.5em;
    font-size: 1.2em;
    font-family: 'Orbitron', sans-serif;

`

const Li = styled.li`
    list-style-type: none;
    display: flex;
    margin: 20px 35px;
    line-height: 1.5em;
    background: ${props => props.selected ? 'rgb(40, 95, 161)' : 'transparent'}
`;

const Result = styled.div`
  font-family: 'Iceland', cursive;
  font-size: 50px;
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

class Autocomplete extends React.Component {

    constructor() {
        super();
        this.state = {
            allCoins: [],
            value: '',
            cursor: 0
        }
    }

    componentDidMount = () => {
        const allCoins = this.props.allCoins;
        this.setState({ allCoins })
    }

    componentWillReceiveProps = (nextProps) => {
        const allCoins = nextProps.allCoins;
        this.setState({ allCoins })
    }

    handleChange = (event, num) => {
        const { cursor, allCoins } = this.state
        console.log(cursor)
        if (event.key === 'ArrowUp' && cursor > 0) {
            this.setState(prevState => ({
                cursor: prevState.cursor - 1
            }))
        } else if (event.key === 'ArrowDown' && cursor < 10 - 1) {
            this.setState(prevState => ({
                cursor: prevState.cursor + 1
            }))
        } else if (event.target.value !== '') {
            this.setState({ value: event.target.value })
        } else {
            this.setState({ value: event.target.value, result: '' })
        }
    }

    selectValue = (event) => {
        const coin = event.target.getAttribute('data-name');
        axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=EUR`)
            .then((response) => {
                console.log(response);
                this.setState({ result: response.data.DISPLAY[coin].EUR.PRICE })

            })
            .catch(function (error) {
                console.log(error);
            });
    }



    render() {
        const { allCoins, cursor } = this.state;
        return (
            <Wrapper>
                <InputWrapper>
                    <Icon />
                    <Input placeholder='Type the crypto name...' onKeyUp={this.handleChange} />
                </InputWrapper>
                {
                    this.state.value != '' &&
                    <Results>
                        <ul>
                            {
                                allCoins.filter((coin) => {
                                    return (
                                        coin.label.toLowerCase().includes(this.state.value.toLowerCase()) ||
                                        coin.name.toLowerCase().includes(this.state.value.toLowerCase())
                                    );
                                }).slice(0, 10).map((coin, index) => {
                                    return (cursor === index ?
                                     <Li data-name={coin.name} selected id={index} onClick={this.selectValue}><CoinIcon src={coin.image} />{coin.label} ({coin.name})</Li> :
                                     <Li data-name={coin.name} id={index} onClick={this.selectValue}><CoinIcon src={coin.image}/>{coin.label} ({coin.name})</Li>
                                    )
                                })
                            }
                        </ul>
                    </Results>
                }
                <Result>
                    {this.state.result}
                </Result>
            </Wrapper>
        )
    }
}

export default Autocomplete

