import { ReactiveVar } from 'meteor/reactive-var';

// Reactive variables
const statesVar = new ReactiveVar([]);
const citiesVar = new ReactiveVar([]);
const stateCodesVar = new ReactiveVar([]);
const selectedStateVar = new ReactiveVar(null); // Seçilen eyalet için yeni reaktif değişken

// Setters
const setStates = (newStates) => {
  statesVar.set(newStates);
};

const setCities = (newCities) => {
  citiesVar.set(newCities);
};

const setStateCodes = (newStateCodes) => {
  stateCodesVar.set(newStateCodes);
};

const setSelectedState = (newState) => {
  selectedStateVar.set(newState);
};

// Getters
const getStates = () => {
  return statesVar.get();
};

const getCities = () => {
  return citiesVar.get();
};

const getStateCodes = () => {
  return stateCodesVar.get();
};

const getSelectedState = () => {
  return selectedStateVar.get();
};

export { setStates, getStates, setCities, getCities, setStateCodes, getStateCodes, setSelectedState, getSelectedState };
