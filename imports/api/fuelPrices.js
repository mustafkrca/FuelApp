import { HTTP } from 'meteor/http';

const API_KEY = 'apikey 7EQGCmwapOtM2HNr9C39Y8:1CQVhCFCXKhMVZgctZK4Dn';
const BASE_URL = 'https://api.collectapi.com/gasPrice';

export const fetchStatePrices = () => {
  return new Promise((resolve, reject) => {
    HTTP.call('GET', `${BASE_URL}/allUsaPrice`, {
      headers: {
        'content-type': 'application/json',
        authorization: API_KEY,
      },
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(result.content));
      }
    });
  });
};

export const fetchCityPrices = (state) => {
  return new Promise((resolve, reject) => {
    HTTP.call('GET', `${BASE_URL}/stateUsaPrice?state=${state}`, {
      headers: {
        'content-type': 'application/json',
        authorization: API_KEY,
      },
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(result.content));
      }
    });
  });
};


export const fetchStateCodes = () => {
  return new Promise((resolve, reject) => {
    HTTP.call('GET', `${BASE_URL}/usaStateCode`, {
      headers: {
        'content-type': 'application/json',
        authorization: API_KEY,
      },
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(result.content).result);
      }
    });
  });
};