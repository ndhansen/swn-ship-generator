import { addItem, removeItem } from ".";

const weapons = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_WEAPON': {
      return addItem(state, action.weaponData);
    }
    case 'REMOVE_WEAPON': {
      return removeItem(state, action.weaponData);
    }
    default: {
      return state;
    }
  }
}

export default weapons;
