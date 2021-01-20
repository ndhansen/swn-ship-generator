import { combineReducers } from 'redux';
import hull from "./hull";
import drive from "./drive";
import modules from "./modules";
import weapons from "./weapons";

export default combineReducers({
  hull,
  drive,
  modules,
  weapons,
});