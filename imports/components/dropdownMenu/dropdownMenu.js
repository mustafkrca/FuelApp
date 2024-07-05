import { Template } from 'meteor/templating';
import { getStates, setSelectedState } from '../../lib/datas.js';
import './dropdownMenu.html';
import './dropdownMenu.css';

Template.dropdownMenu.helpers({
  states() {
    const statesData = getStates();
    if (statesData) {
      return statesData.map(state => ({
        state: state.state,
        stateCode: state.stateCode
      }));
    } else {
      return []; 
    }
  }
});

Template.dropdownMenu.events({
  'click .dropdown-item'(event) {
    const selectedState = event.target.text.trim().split(' ')[0]; // WA - Washington => WA
    setSelectedState(selectedState);
  }
});
