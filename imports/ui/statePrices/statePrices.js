//imports/ui/statePrices/statePrices.js

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { setStates, getStates, setStateCodes, getStateCodes } from '../../lib/datas.js';
import './statePrices.html';

Template.statePrices.onCreated(function () {
  const instance = this;

  instance.autorun(() => {
    Meteor.call('fetch.statePrices', (error, statePricesData) => {
      if (error) {
        console.error('Error fetching state prices:', error);
        return;
      }

      Meteor.call('fetch.stateCodes', (error, stateCodesData) => {
        if (error) {
          console.error('Error fetching state codes:', error);
          return;
        }

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
      });
    });
  });
});

Template.statePrices.helpers({
  states() {
    return getStates();
  }
});