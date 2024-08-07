import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { setStates, getStates, setStateCodes, getStateCodes, setError, setIsLoading, getIsLoading } from '../../lib/datas.js';
import './statePrices.html';

Template.statePrices.onCreated(function () {

  this.autorun(() => {
    setIsLoading(true);

    Meteor.call('fetch.statePrices', (error, statePricesData) => {
      if (error) {
        console.error('Error fetching state prices:', error);
        setError(`Failed to fetch state prices. Please try again later.${error}`);
        return;
      }

      Meteor.call('fetch.stateCodes', (error, stateCodesData) => {
        if (error) {
          console.error('Error fetching state codes:', error);
          setError(`Failed to fetch state codes. Please try again later.${error}`);
          return;
        }

        setStates(statePricesData.result);
        setStateCodes(stateCodesData); 

        const statePrices = getStates();
        const stateCodes = getStateCodes();
        const newStateCodes = statePrices.map(state => {
          const stateCode = stateCodes.find(code => code.name === state.name);
          return {
            state: state.name,
            stateCode: stateCode ? stateCode.code : '',
            regular: state.gasoline,
            midgrade: state.midGrade,
            premium: state.premium,
            diesel: state.diesel
          };
        });

        setStates(newStateCodes);
        setIsLoading(false);

      });
    });
  });
});

Template.statePrices.helpers({
  states() {
    return getStates();
  },
  isLoading() {
    return getIsLoading();
  }
});
