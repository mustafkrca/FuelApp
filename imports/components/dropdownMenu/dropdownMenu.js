import { Template } from 'meteor/templating';
import { getSelectedState, getStates, setSelectedState } from '../../lib/datas.js';
import './dropdownMenu.html';
import './dropdownMenu.css';


Template.dropdownMenu.helpers({
  states() {
    const statesData = getStates();
    const firstState = `${statesData[0].stateCode} - ${statesData[0].state}`;
    setSelectedState(firstState); 
    if (statesData) {
      return statesData.map(state => ({
        state: state.state,
        stateCode: state.stateCode
      }));
    } else {
      return [];
    }
  },
  selectedState(){
    return getSelectedState();
  }
});

Template.dropdownMenu.events({
  'click .dropdown-item'(event) {
    const selectedState = event.target.text.trim(); 
    setSelectedState(selectedState);
  }
});
