import React from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Autocomplete from 'components/Autocomplete'

const MainWrapper = styled.div`
  background: rgb(171, 178, 185);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Orbitron', sans-serif;
`

const InputWrapper = styled.div`
  display: flex;
  height: 500px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;



class MainContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      result: '',
      allCoins: [],
      value: ''
    }
  }

  componentWillMount = () => {
    axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
      .then((response) => {
        // response.data.DATA
        let allCoins = response.data.Data;
        const allKeys = Object.keys(response.data.Data);
        allCoins = allKeys.map((key) => {
          return { image: allCoins[key].ImageUrl, name: allCoins[key].Name, label: allCoins[key].CoinName }
        });
        this.setState({ allCoins })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
    // event.preventDefault();
    // const coin = event.target.value;
    // axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${event.target.value}&tsyms=EUR`)
    //   .then((response) => {
    //     // console.log(response.data.RAW);
    //     this.setState({ result: response.data.DISPLAY[coin].EUR.PRICE })

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }



  render() {
    const { allCoins } = this.state;
    console.log('allcoins: ', allCoins);
    return (
      <MainWrapper>
        <InputWrapper>
          <Autocomplete allCoins={allCoins}/>
        </InputWrapper>
      </MainWrapper>
    )
  }
}

export default MainContainer
