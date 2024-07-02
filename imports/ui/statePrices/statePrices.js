import { Template } from 'meteor/templating';
import { setStates, getStates, setStateCodes, getStateCodes } from '../../lib/datas.js';
import './statePrices.html';
import { fetchStatePrices, fetchStateCodes } from '../../api/fuelPrices.js';

Template.statePrices.onCreated(function () {
  // Fetch state prices and codes
  Promise.all([fetchStatePrices(), fetchStateCodes()])
    .then(([statePricesData, stateCodesData]) => {
      setStates(statePricesData.result);
      setStateCodes(stateCodesData); // Assuming stateCodesData is an array

      const statePrices = getStates();
      const stateCodes = getStateCodes();
      const newStateCodes = statePrices.map(state => {
        const stateCodeObj = stateCodes.find(code => code.name === state.name);
        return {
          state: state.name,
          stateCode: stateCodeObj ? stateCodeObj.code : '', 
          regular: state.gasoline,
          midgrade: state.midGrade,
          premium: state.premium, 
          diesel: state.diesel
        };
      });

      setStates(newStateCodes);
    })
    .catch(error => {
      console.error('API calls failed:', error);
    });
});

Template.statePrices.helpers({
  states() {
    return getStates();
  }
});