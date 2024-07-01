// imports/ui/statePrices/statePrices.js

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../navbarSlider/navbarSlider.js'
import './statePrices.html';
import './statePrices.css';
import { HTTP } from 'meteor/http'; // HTTP paketini ekledik

Template.statePrices.onCreated(function () {
  this.statePrices = new ReactiveVar([]); // Global değil, şablona özgü

  const options = {
    method: 'GET',
    hostname: 'api.collectapi.com',
    path: '/gasPrice/allUsaPrice',
    headers: {
      'content-type': 'application/json',
      authorization: 'apikey 5toGzgf6IBwy1dzaQ9xoaT:0LEsTkOGd2XF1FvpmllS2G', // API anahtarını buraya ekleyin
    },
  };

  HTTP.call('GET', 'https://api.collectapi.com/gasPrice/allUsaPrice', options, (error, result) => {
    if (error) {
      console.error('API çağrısı başarısız:', error);
    } else {
      console.log('result.content', result.content);
      this.statePrices.set(JSON.parse(result.content));
    }
  });
});

Template.statePrices.helpers({
  states() {
    const statePrices = Template.instance().statePrices.get();
    if (statePrices && statePrices.result) {
      return statePrices.result.map(state => ({
        state: state.name,
        regular: state.gasoline,
        midgrade: state.midGrade,
        premium: state.premium,
        diesel: state.diesel
      }));
    } else {
      return []; // Veri yoksa boş dizi döndür
    }
  },
});