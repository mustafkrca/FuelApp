import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { getSelectedState, setCities, getCities } from '../../lib/datas.js';
import './cityPrices.html';
import './cityPrices.css';
import { fetchCityPrices } from '../../api/fuelPrices.js';

Template.cityPrices.onCreated(function () {
    this.autorun(() => {
        const selectedState = getSelectedState();
        if (selectedState) {
            fetchCityPrices(selectedState.split(' ')[0])
                .then(citiesData => {
                    setCities(citiesData.result.cities);
                    this.state.set(citiesData.result.state); // Set the state data
                    console.log('selectedState:', selectedState);
                    console.log('citiesData:', citiesData.result);
                })
                .catch(error => {
                    console.error('Failed to fetch city prices:', error);
                });
        }
    });

    this.state = new ReactiveVar(null); // Initialize reactive variable for state
});

Template.cityPrices.helpers({
    cities() {
        const cities = getCities();
        const cityCodes = cities.map(city => {
            return {
                ...city,
                cityCode: city.name.substring(0, 2).toUpperCase() // Capitalize first two letters
            };
        });
        return cityCodes;
    },
    state() {
        const state = Template.instance().state.get(); // Retrieve state data
        const selectedState = getSelectedState();
        const stateCode = selectedState ? selectedState.split(' ')[0] : ''; // Extract state code

        return {
            ...state,
            stateCode: stateCode
        };
    }
});
