import { addItem, removeItem } from ".";

const modules = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MODULE': {
      return addItem(state, action.moduleData);
    }
    case 'REMOVE_MODULE': {
      return removeItem(state, action.moduleData);
    }
    default: {
      return state;
    }
  }
}

export default modules;
