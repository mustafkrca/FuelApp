import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { getSelectedState, setCities, getCities } from '../../lib/datas.js';
import './cityPrices.html';
import { Meteor } from 'meteor/meteor';

Template.cityPrices.onCreated(function () {
  this.state = new ReactiveVar(null); // Initialize reactive variable for state

  this.autorun(() => {
    const selectedState = getSelectedState();
    if (selectedState) {
      Meteor.call('fetch.cityPrices', selectedState.split(' ')[0], (error, citiesData) => {
        if (error) {
          console.log('Failed to fetch city prices:', error);
          return;
        }

        setCities(citiesData.result.cities);
        this.state.set(citiesData.result.state); // Set the state data
      });
    }
  });
});

Template.cityPrices.helpers({
  cities() {
    const cities = getCities();
    const cityCodes = cities.map(city => ({
      ...city,
      cityCode: city.name.substring(0, 2).toUpperCase() // Capitalize first two letters
    }));
    return cityCodes;
  },
  state() {
    const instance = Template.instance();
    const state = instance.state.get(); // Retrieve state data
    const selectedState = getSelectedState();
    const stateCode = selectedState ? selectedState.split(' ')[0] : ''; // Extract state code

    return {
      ...state,
      stateCode: stateCode
    };
  },
  stateBool() {
    const selectedState = getSelectedState();

    return !!selectedState; // Convert to boolean
  }
});
