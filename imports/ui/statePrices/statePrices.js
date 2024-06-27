import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './statePrices.html';
import './statePrices.css';
import { HTTP } from 'meteor/http'; // HTTP paketini ekledik

Template.statePrices.onCreated(function () {
  this.statePrices = new ReactiveVar([]);

  const options = {
    method: 'GET',
    hostname: 'api.collectapi.com',
    path: '/gasPrice/allUsaPrice',
    headers: {
      'content-type': 'application/json',
      authorization: 'apikey 2Z5VTj6hIzrnDAirco0p7J:4clq6oJ7yhjO2cCc0OqgZh', // API anahtarını buraya ekleyin
    },
  };

  HTTP.call('GET', 'https://api.collectapi.com/gasPrice/allUsaPrice', options, (error, result) => {
    if (error) {
      console.error('API çağrısı başarısız:', error);
    } else {
      console.log('result.content', result.content)
      this.statePrices.set(JSON.parse(result.content));
    }
  });
});

Template.statePrices.helpers({
  cities() {
    const statePrices = Template.instance().statePrices.get();
    if (statePrices && statePrices.result) {
      return statePrices.result.map(city => ({
        city: city.name,  
        regular: city.gasoline,
        midgrade: city.midGrade,
        premium: city.premium,
        diesel: city.diesel
      }));
    } else {
      return []; // Veri yoksa boş dizi döndür
    }
  },
});
