import { combineReducers } from 'redux';
import costModifier from './costModifier';
import ship from './ship';
import name from './name';

export default combineReducers ({
  costModifier,
  ship,
  name
});