import { Template } from 'meteor/templating';
import { setStates, getStates, setStateCodes, getStateCodes } from '../../lib/datas.js';
import './statePrices.html';
import './statePrices.css';
import { fetchStatePrices, fetchStateCodes } from '../../api/fuelPrices.js';

Template.statePrices.onCreated(function () {
  // Fetch state prices and codes
  Promise.all([fetchStatePrices(), fetchStateCodes()])
    .then(([statePricesData, stateCodesData]) => {
      setStates(statePricesData.result);
      setStateCodes(stateCodesData); // Assuming stateCodesData is an array
    })
    .catch(error => {
      console.error('API calls failed:', error);
    });
});

Template.statePrices.helpers({
  states() {
    const statePrices = getStates();
    const stateCodes = getStateCodes();
    const newStateCodes = statePrices.map(state => {
      const stateCodeObj = stateCodes.find(code => code.name === state.name);
      return {
        state: state.name,
        stateCode: stateCodeObj ? stateCodeObj.code : '', // Get corresponding state code or empty string if not found
        regular: state.gasoline,
        midgrade: state.midGrade,
        premium: state.premium,
        diesel: state.diesel
      };
    });

    if (statePrices && stateCodes) {
      return newStateCodes;
    } else {
      return []; // Return empty array if data is not available
    }
  }
});
