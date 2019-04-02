import { combineReducers } from 'redux';
import costModifier from './costModifier';
import ship from './ship';

export default combineReducers ({
  costModifier,
  ship
});