import { addItem, removeItem } from ".";

const defenses = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DEFENSE': {
      return addItem(state, action.defenseData);
    }
    case 'REMOVE_DEFENSE': {
      return removeItem(state, action.defenseData);
    }
    default: {
      return state;
    }
  }
}

export default defenses;
