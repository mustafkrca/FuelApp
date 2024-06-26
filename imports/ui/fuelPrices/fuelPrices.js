// imports/ui/fuelPrices.js

import { Template } from 'meteor/templating';
import './fuelPrices.html';
import './fuelPrices.css';

Template.fuelPrices.helpers({
  cities: [
    { city: 'İstanbul', regular: '7.50', midgrade: '8.20', premium: '8.80', diesel: '6.50' },
    { city: 'Ankara', regular: '7.40', midgrade: '8.10', premium: '8.70', diesel: '6.40' },
    { city: 'İzmir', regular: '7.60', midgrade: '8.30', premium: '8.90', diesel: '6.60' },
    // Buraya istediğiniz şehirleri ve fiyatları ekleyebilirsiniz
  ]
});
