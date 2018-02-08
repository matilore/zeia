import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Autocomplete from 'components/Autocomplete';
import actionCreators from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const MainWrapper = styled.div`
  background: rgb(55, 62, 81);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Orbitron', sans-serif;
`;

const InputWrapper = styled.div`
  display: flex;
  height: 700px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

class MainContainer extends React.Component {
  componentWillMount = () => {
    this.props.receiveAllCoins();
  };

  render() {
    return (
      <MainWrapper>
        <InputWrapper>
          <Autocomplete allCoins={this.props.allCoins} />
        </InputWrapper>
      </MainWrapper>
    );
  }
}

function mapStateToProps(state) {
  return { allCoins: state.coinsInfo.allCoins };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({ ...actionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(MainContainer);
