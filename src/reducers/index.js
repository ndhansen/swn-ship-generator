import { combineReducers } from 'redux';
import costModifier from './costModifier';
import ship from './ship';
import name from './name';

const appReducer = combineReducers({
  costModifier,
  ship,
  name
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'IMPORT_SHIP': {
      console.log(action.state);
      return appReducer(action.state, action);
    }
    case 'CLEAR': {
      return appReducer(undefined, action);
    }
    default: {
      return appReducer(state, action);
    }
  }
}

export default rootReducer;