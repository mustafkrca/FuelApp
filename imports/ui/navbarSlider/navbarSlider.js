import { Template } from 'meteor/templating';
import { getStates, setSelectedState } from '../../lib/datas.js'; // Import setSelectedState and getSelectedState
import { ReactiveVar } from 'meteor/reactive-var';

import './navbarSlider.html';   
import '../statePrices/statePrices.js';
import '../statePrices/statePrices.css';
import '../statePrices/statePrices.html';

Template.navbarSlider.onCreated(function () {
  this.activeTab = new ReactiveVar('statePrices');
});

Template.navbarSlider.helpers({
  states() {
    const statesData = getStates(); // Get all state information

    if (statesData) {
      return statesData.map(state => ({
        state: state.state,
        stateCode: state.stateCode
      }));
    } else {
      return []; // Return empty array if no data available
    }
  },
  isActiveTab(tabName) {
    return Template.instance().activeTab.get() === tabName;
  }
});

Template.navbarSlider.events({
  'click .nav-item'(event, instance) {
    const tabId = event.currentTarget.id;
    if (tabId === 'nav-state-tab') {
      instance.activeTab.set('statePrices');
    } else if (tabId === 'nav-city-tab') {
      instance.activeTab.set('cityPrices');
    }
  },
  'click .dropdown-item'(event) {
    const selectedState = event.target.text.trim(); // Get the selected state from dropdown item text
    setSelectedState(selectedState); // Set the selected state using setSelectedState function
  }
});
