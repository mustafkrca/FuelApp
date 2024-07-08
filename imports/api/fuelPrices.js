import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

const API_KEY = Meteor.settings.private.apiKey;
const BASE_URL = Meteor.settings.public.baseUrl;

const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': API_KEY,
      }),
    });


    return await response.json();
  } catch (error) {
    throw new Meteor.Error(`Fetch failed: ${error.message}`);
  }
};

export const fetchStatePrices = async () => await fetchFromApi('allUsaPrice');

export const fetchCityPrices = async (stateCode) => await fetchFromApi(`stateUsaPrice?state=${stateCode}`);

export const fetchStateCodes = async () => {
  const result = await fetchFromApi('usaStateCode');
  return result.result;
};
