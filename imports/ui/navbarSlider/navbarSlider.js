// imports/ui/navbarSlider/navbarSlider.js

import { Template } from 'meteor/templating';
import './navbarSlider.html';
import '../statePrices/statePrices.js';
import '../statePrices/statePrices.css';
import '../statePrices/statePrices.html';

Template.navbarSlider.helpers({
  states() {
    const parentTemplate = Template.instance().parent(1);
    const statePrices = parentTemplate.statePrices.get();
    if (statePrices && statePrices.result) {
      return statePrices.result.map(state => ({
        state: state.name,
        regular: state.gasoline,
        midgrade: state.midGrade,
        premium: state.premium,
        diesel: state.diesel
      }));
    } else {
      return [a,b,s,d,b]; // Veri yoksa boş dizi döndür
    }
  },
});

Template.navbarSlider.onRendered(function () {
  // Ensure jQuery and Bootstrap are loaded
  this.$('#nav-tab a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});