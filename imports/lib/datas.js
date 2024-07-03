import { ReactiveVar } from 'meteor/reactive-var';

// Reactive variables
const statesVar = new ReactiveVar([]);
const citiesVar = new ReactiveVar([]);
const stateCodesVar = new ReactiveVar([]);
const selectedStateVar = new ReactiveVar(null); 
const errorVar = new ReactiveVar(null); 
const isLoadingVar = new ReactiveVar(false); 

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

const setError = (error) => {
  errorVar.set(error);
};

const setIsLoading = (loadingState) => {
  isLoadingVar.set(loadingState);
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

const getError = () => {
  return errorVar.get();
};

const getIsLoading = () => {
  return isLoadingVar.get();
};

export { setStates, getStates, setCities, getCities, setStateCodes, getStateCodes, setSelectedState, getSelectedState, setError, getError, setIsLoading,
  getIsLoading };
