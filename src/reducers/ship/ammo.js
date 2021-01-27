import { addItem, removeItem } from ".";

const ammo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_AMMO': {
      return addItem(state, action.ammoData);
    }
    case 'REMOVE_AMMO': {
      return removeItem(state, action.ammoData);
    }
    default: {
      return state;
    }
  }
}

export default ammo;
