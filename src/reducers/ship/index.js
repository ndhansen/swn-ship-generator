import { combineReducers } from 'redux';
import hull from "./hull";
import drive from "./drive";
import modules from "./modules";
import weapons from "./weapons";
import defenses from "./defenses";
import ammo from "./ammo";

export default combineReducers({
  hull,
  drive,
  modules,
  weapons,
  defenses,
  ammo,
});

export const addItem = (state, itemData) => {
  if (state[itemData.name]) {
    // If the module already is in there
    return {
      ...state,
      [itemData.name]: {
        ...state[itemData.name],
        count: state[itemData.name].count + 1
      },
    };
  } else {
    // Otherwise, add a new module
    return {
      ...state,
      [itemData.name]: {
        ...itemData,
        count: 1,
      },
    };
  }
}

export const removeItem = (state, itemData) => {
  if (state[itemData.name]?.count > 1) {
    // If there's more than one left, just decrease the count
    return {
      ...state,
      [itemData.name]: {
        ...state[itemData.name],
        count: state[itemData.name].count - 1
      },
    };
  } else {
    // If there's only one left, remove it
    const { [itemData.name]: value, ...newItem } = state;
    return newItem;
  }
}
