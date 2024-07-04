// imports/api/fuelPrices.js
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

const API_KEY = Meteor.settings.private.apiKey;
const BASE_URL = 'https://api.collectapi.com/gasPrice';

const fetchFromApi = (endpoint) => {
  try {
    const result = HTTP.call('GET', `${BASE_URL}/${endpoint}`, {
      headers: {
        'content-type': 'application/json',
        authorization: API_KEY,
      },
    });
    return JSON.parse(result.content);
  } catch (error) {
    throw new Meteor.Error(` ${error}`);
  }
};

export const fetchStatePrices = () => fetchFromApi('allUsaPrice');

export const fetchCityPrices = (stateCode) => fetchFromApi(`stateUsaPrice?state=${stateCode}`);

export const fetchStateCodes = () => fetchFromApi('usaStateCode').result;
