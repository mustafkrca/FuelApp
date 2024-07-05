import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { getError } from '../../lib/datas.js';

import './navbarSlider.html';
import '../statePrices/statePrices.js';
import '../../components/dropdownMenu/dropdownMenu.js';

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
  'click .nav-link'(event, instance) {
    event.preventDefault();
    const tabId = event.currentTarget.getAttribute('href').substring(1);
    instance.activeTab.set(tabId);
  }
});
