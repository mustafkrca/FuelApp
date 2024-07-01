import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/ui/statePrices/statePrices.html';
import '../imports/ui/statePrices/statePrices.css';
import '../imports/ui/statePrices/statePrices.js';

import '../imports/ui/cityPrices/cityPrices.js';
import '../imports/ui/cityPrices/cityPrices.css';
import '../imports/ui/cityPrices/cityPrices.html';

import '../imports/ui/navbarSlider/navbarSlider.html';
import '../imports/ui/navbarSlider/navbarSlider.js';

import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './main.html';

Template.body.onRendered(function () {
  // Event listener for tab change
  $('#nav-tab a').on('shown.bs.tab', function (event) {
    var activeTab = $(event.target).attr('href'); // Get the active tab
    if (activeTab === '#cityPrices') {
      $('#city-dropdown').show(); // Show dropdown when cityPrices tab is active
    } else {
      $('#city-dropdown').hide(); // Hide dropdown when cityPrices tab is inactive
    }
  });
});
