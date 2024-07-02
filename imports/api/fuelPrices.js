//imports/api/fuelPrices.js


import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

const API_KEY = 'apikey 3FodQlgMPR5xQTul1EUCUY:0lsxvXqa2Qu9RDQP7vzUyt';
const BASE_URL = 'https://api.collectapi.com/gasPrice';

export const fetchStatePrices = () => {
  try {
    const result = HTTP.call('GET', `${BASE_URL}/allUsaPrice`, {
      headers: {
        'content-type': 'application/json',
        authorization: API_KEY,
      },
    });
    return JSON.parse(result.content);
  } catch (error) {
    throw new Meteor.Error('fetch-state-prices-failed', 'Failed to fetch state prices', error);
  }
};

export const fetchCityPrices = (stateCode) => {
  try {
    const result = HTTP.call('GET', `${BASE_URL}/stateUsaPrice?state=${stateCode}`, {
      headers: {
        'content-type': 'application/json',
        authorization: API_KEY,
      },
    });
    return JSON.parse(result.content);
  } catch (error) {
    throw new Meteor.Error('fetch-city-prices-failed', 'Failed to fetch city prices', error);
  }
};

export const fetchStateCodes = () => {
  try {
    const result = HTTP.call('GET', `${BASE_URL}/usaStateCode`, {
      headers: {
        'content-type': 'application/json',
        authorization: API_KEY,
      },
    });
    return JSON.parse(result.content).result;
  } catch (error) {
    throw new Meteor.Error('fetch-state-codes-failed', 'Failed to fetch state codes', error);
  }
};