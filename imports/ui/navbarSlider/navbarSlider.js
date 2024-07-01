import { Template } from 'meteor/templating';
import { getStates } from '../../lib/datas.js'; // Veri getirmek için
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
    const statesData = getStates(); // Tüm eyalet bilgilerini al

    if (statesData) {
      return statesData.map(state => ({
        state: state.name
      }));
    } else {
      return []; // Veri yoksa boş dizi döndür
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
  }
});
