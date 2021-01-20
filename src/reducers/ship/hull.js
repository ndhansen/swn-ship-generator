const hull = (state = {}, action) => {
  switch (action.type) {
    case 'SET_HULL_TYPE': {
      return action.hullData;
    }
    default: {
      return state;
    }
  }
}

export default hull;
