// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
// import './cityPrices.html';
// import './cityPrices.css';

// Template.cityPrices.onCreated(function() {
//   this.cityPrices = new ReactiveVar([]);

//   const state = this.data.state; // state parametresini alın

//   Meteor.call('cityPricesByState', state, (error, result) => {
//     if (error) {
//       console.error('API çağrısı başarısız:', error);
//     } else {
//       this.cityPrices.set(result);
//     }
//   });
// });

// Template.cityPrices.helpers({
//   cities() {
//     return Template.instance().cityPrices.get();
//   }
// });
