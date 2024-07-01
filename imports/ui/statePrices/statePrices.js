// imports/ui/statePrices/statePrices.js

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { setStates,getStates } from '../../lib/datas.js'; // Veri getirmek için

import '../navbarSlider/navbarSlider.js';
import './statePrices.html';
import './statePrices.css';
import { fetchStatePrices } from '../../api/fuelPrices.js';

Template.statePrices.onCreated(function () {

  fetchStatePrices()
    .then(data => {
      setStates(data.result); // Sadece sonuç dizisini ayarla

    })
    .catch(error => {
      console.error('API çağrısı başarısız:', error);
    });

  
});

Template.statePrices.helpers({
  states() {
    const statePrices = getStates();
    if (statePrices) {
      // Burada veri getirmek için kullanılan kodu güncelliyoruz
      return statePrices.map(state => ({
        state: state.name,
        regular: state.gasoline,
        midgrade: state.midGrade,
        premium: state.premium,
        diesel: state.diesel
      }));
    } 
    else {
      return []; // Veri yoksa boş dizi döndür
    }
  },
});
