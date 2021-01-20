const addModule = (state, moduleData) => {
  if (state[moduleData.name]) {
    // If the module already is in there
    return {
      ...state,
      [moduleData.name]: {
        ...state[moduleData.name],
        count: state[moduleData.name].count + 1
      },
    };
  } else {
    // Otherwise, add a new module
    return {
      ...state,
      [moduleData.name]: {
        ...moduleData,
        count: 1,
      }
    };
  }
}

const removeModule = (state, moduleData) => {
  if (state[moduleData.name]?.count > 1) {
    // If there's more than one left, just decrease the count
    return {
      ...state,
      [moduleData.name]: {
        ...state[moduleData.name],
        count: state[moduleData.name].count - 1
      },
    };
  } else {
    // If there's only one left, remove it
    const { [moduleData.name]: value, ...newModules } = state;
    return newModules;
  }
}

const modules = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MODULE': {
      return addModule(state, action.moduleData);
    }
    case 'REMOVE_MODULE': {
      return removeModule(state, action.moduleData);
    }
    default: {
      return state;
    }
  }
}

export default modules;
