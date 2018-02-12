import ApiController from 'helpers/ApiController';

const apiController = new ApiController('https://streamer.cryptocompare.com/');

export const selectCoin = apiController.selectCoin;
export const deselectActiveCoin = apiController.deselectActiveCoin;
