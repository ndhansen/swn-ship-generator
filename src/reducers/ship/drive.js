const drive = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DRIVE': {
      return action.driveData;
    }
    case 'REMOVE_DRIVE': {
      return {};
    }
    default: {
      return state;
    }
  }
}

export default drive;
