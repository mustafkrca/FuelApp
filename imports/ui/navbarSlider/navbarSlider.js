import { Template } from 'meteor/templating';
import { getError } from '../../lib/datas.js';
import { ReactiveVar } from 'meteor/reactive-var';
import './navbarSlider.html';   
import '../statePrices/statePrices.js';
import '../statePrices/statePrices.html';
import '../../components/dropdownMenu/dropdownMenu.js';
import '../../components/dropdownMenu/dropdownMenu.html';
import '../../components/dropdownMenu/dropdownMenu.css';

Template.navbarSlider.onCreated(function () {
  this.activeTab = new ReactiveVar('statePrices');
});

Template.navbarSlider.helpers({
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
  }
});
