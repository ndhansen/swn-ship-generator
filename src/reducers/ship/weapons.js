const addWeapon = (state, weaponData) => {
  if (state[weaponData.name]) {
    // If the module already is in there
    return {
      ...state,
      [weaponData.name]: {
        ...state[weaponData.name],
        count: state[weaponData.name].count + 1
      },
    };
  } else {
    // Otherwise, add a new module
    return {
      ...state,
      [weaponData.name]: {
        ...weaponData,
        count: 1,
      },
    };
  }
}

const removeWeapon = (state, weaponData) => {
  if (state[weaponData.name]?.count > 1) {
    // If there's more than one left, just decrease the count
    return {
      ...state,
      [weaponData.name]: {
        ...state[weaponData.name],
        count: state[weaponData.name].count - 1
      },
    };
  } else {
    // If there's only one left, remove it
    const { [weaponData.name]: value, ...newWeapons } = state;
    return newWeapons;
  }
}

const weapons = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_WEAPON': {
      return addWeapon(state, action.weaponData);
    }
    case 'REMOVE_WEAPON': {
      return removeWeapon(state, action.weaponData);
    }
    default: {
      return state;
    }
  }
}

export default weapons;
