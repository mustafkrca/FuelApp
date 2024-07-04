import { Template } from 'meteor/templating';
import { getStates, setSelectedState, getError } from '../../lib/datas.js';
import { ReactiveVar } from 'meteor/reactive-var';
import './navbarSlider.html';   
import './navbarSlider.css';   
import '../statePrices/statePrices.js';
import '../statePrices/statePrices.html';

Template.navbarSlider.onCreated(function () {
  this.activeTab = new ReactiveVar('statePrices');
});

Template.navbarSlider.helpers({
  states() {
    const statesData = getStates();

    if (statesData) {
      return statesData.map(state => ({
        state: state.state,
        stateCode: state.stateCode
      }));
    } else {
      return []; 
    }
  },
  isActiveTab(tabName) {
    return Template.instance().activeTab.get() === tabName;
  },
  error() {
    return getError();
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
    const selectedState = event.target.text.trim(); 
    setSelectedState(selectedState); 
  }
});
