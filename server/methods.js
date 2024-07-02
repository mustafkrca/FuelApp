//server/methods.js

import { Meteor } from 'meteor/meteor';
import { fetchStateCodes, fetchCityPrices, fetchStatePrices } from '../imports/api/fuelPrices';

Meteor.methods({
  'fetch.statePrices'() {
    return fetchStatePrices();
  },
  
  'fetch.cityPrices'(stateCode) {
    return fetchCityPrices(stateCode);
  },
  
  'fetch.stateCodes'() {
    return fetchStateCodes();
  },
});