import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { getSelectedState, setCities, getCities, setError, setIsLoading, getIsLoading } from '../../lib/datas.js';
import './cityPrices.html';
import { Meteor } from 'meteor/meteor';

Template.cityPrices.onCreated(function () {
  this.state = new ReactiveVar(null); 

  this.autorun(() => {
    setIsLoading(true); 
    const selectedState = getSelectedState();
    if (selectedState) {
      Meteor.call('fetch.cityPrices', selectedState.split(' ')[0], (error, citiesData) => {
        if (error) {
          console.log('Failed to fetch city prices:', error);
          setError(`Failed to fetch city prices. Please try again later.${error}`);
          return;
        }
        
        setCities(citiesData.result.cities);
        this.state.set(citiesData.result.state); 
        setIsLoading(false); 
      });
    } 
  });
});

Template.cityPrices.helpers({
  cities() {
    const cities = getCities();
    return cities.map(city => ({
      ...city,
      cityCode: city.name.substring(0, 2).toUpperCase() 
    }));
  },
  state() {
    const state = Template.instance().state.get(); 
    const selectedState = getSelectedState();
    const stateCode = selectedState ? selectedState.split(' ')[0] : '';

    return {
      ...state,
      stateCode: stateCode
    };
  },
  stateBool() {
    const selectedState = getSelectedState();
    return !!selectedState; 
  },
  isLoading() {
    return getIsLoading();
  }
});
