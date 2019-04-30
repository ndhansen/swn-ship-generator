let defaultShip = {
  baseStats: {
    hullType: '',
    cost: 0,
    speed: 0,
    armor: 0,
    hp: 0,
    minCrew: 0,
    maxCrew: 0,
    ac: 0,
    power: 0,
    mass: 0,
    hardpoints: 0,
    class: ''
  },
  drive: {},
  modules: {},
  weapons: {},
  derivedStats: {
    cost: 0,
    power: 0,
    mass: 0,
    hardpoints: 0,
  }
};

const getDerivedStats = (state) => {
  let cost = state.baseStats.cost;
  let power = state.baseStats.power;
  let mass = state.baseStats.mass;
  let hardpoints = state.baseStats.hardpoints;

  // Check modules
  for (let moduleName in state.modules) {
    cost += state.modules[moduleName].cost * state.modules[moduleName].count;
    power -= state.modules[moduleName].power * state.modules[moduleName].count;
    mass -= state.modules[moduleName].mass * state.modules[moduleName].count;
  }
  
  // Check weapons
  for (let weaponName in state.weapons) {
    cost += state.weapons[weaponName].cost * state.weapons[weaponName].count;
    power -= state.weapons[weaponName].power * state.weapons[weaponName].count;
    mass -= state.weapons[weaponName].mass * state.weapons[weaponName].count;
    hardpoints -= state.weapons[weaponName].hardpoints * state.weapons[weaponName].count;
  }

  // Check drive
  if (!(Object.entries(state.drive).length === 0 && state.drive.constructor === Object)) {
    cost += state.drive.cost;
    power -= state.drive.power;
    mass -= state.drive.mass;
  }

  // Check defenses

  return {
    cost: cost,
    power: power,
    mass: mass,
    hardpoints: hardpoints
  }
}

const isValidState = (state) => {
  if (state.derivedStats.power < 0 || 
      state.derivedStats.mass < 0 ||
      state.derivedStats.hardpoints < 0 ||
      state.derivedStats.power > state.baseStats.power ||
      state.derivedStats.mass > state.baseStats.mass ||
      state.derivedStats.hardpoints > state.baseStats.hardpoints) {
    return false;
  }
  return true;
}

// Only submits the new state if it's valid
const submitValidState = (oldState, newState) => {
  newState = {
    ...newState,
    derivedStats: getDerivedStats(newState)
  }
  if (isValidState(newState)) {
    return newState;
  }
  return oldState;
}

const addModule = (state, moduleData) => {
  if (state.modules[moduleData.name]) {
    // If the module already is in there
    return {
      ...state,
      modules: {
        ...state.modules,
        [moduleData.name]: {
          ...state.modules[moduleData.name],
          count: state.modules[moduleData.name].count + 1
        }
      },
    };
  } else {
    // Otherwise, add a new module
    return {
      ...state,
      modules: {
        ...state.modules,
        [moduleData.name]: {
          cost: moduleData.cost,
          power: moduleData.power,
          mass: moduleData.mass,
          description: moduleData.description,
          count: 1,
        }
      }
    };
  }
}

const removeModule = (state, moduleData) => {
  if (state.modules[moduleData.name].count > 1) {
    // If there's more than one left, just decrease the count
    return {
      ...state,
      modules: {
        ...state.modules,
        [moduleData.name]: {
          ...state.modules[moduleData.name],
          count: state.modules[moduleData.name].count - 1
        }
      },
    };
  } else {
    // If there's only one left, remove it
    const { [moduleData.name]: value, ...newModules } = state.modules;
    return {
      ...state,
      modules: {
        ...newModules
      },
    };
  }
}

const addWeapon = (state, weaponData) => {
  if (state.weapons[weaponData.name]) {
    // If the module already is in there
    return {
      ...state,
      weapons: {
        ...state.weapons,
        [weaponData.name]: {
          ...state.weapons[weaponData.name],
          count: state.weapons[weaponData.name].count + 1
        }
      },
    };
  } else {
    // Otherwise, add a new module
    return {
      ...state,
      weapons: {
        ...state.weapons,
        [weaponData.name]: {
          cost: weaponData.cost,
          damage: weaponData.damage,
          power: weaponData.power,
          mass: weaponData.mass,
          hardpoints: weaponData.hardpoints,
          qualities: weaponData.qualities,
          count: 1,
        }
      }
    };
  }
}

const removeWeapon = (state, weaponData) => {
  if (state.weapons[weaponData.name].count > 1) {
    // If there's more than one left, just decrease the count
    return {
      ...state,
      weapons: {
        ...state.weapons,
        [weaponData.name]: {
          ...state.weapons[weaponData.name],
          count: state.weapons[weaponData.name].count - 1
        }
      },
    };
  } else {
    // If there's only one left, remove it
    const { [weaponData.name]: value, ...newWeapons } = state.weapons;
    return {
      ...state,
      weapons: {
        ...newWeapons
      },
    };
  }
}

const setDrive = (state, driveData) => {
  return {
    ...state,
    drive: {
      name: driveData.name,
      cost: driveData.cost,
      power: driveData.power,
      mass: driveData.mass,
      description: driveData.description
    }
  }
}

const removeDrive = (state) => {
  return {
    ...state,
    drive: {}
  }
}

const ship = (state = defaultShip, action) => {
  switch (action.type) {
    case 'SET_HULL_TYPE': {
      let newState = Object.assign(
        {},
        state, 
        {
          baseStats: action.hullData,
          modules: {},
          weapons: {},
          drive:{}
        }
      );
      return submitValidState(state, newState);
    }
    case 'ADD_MODULE': {
      let newState = addModule(state, action.moduleData);
      return submitValidState(state, newState);
    }
    case 'REMOVE_MODULE': {
      let newState = removeModule(state, action.moduleData);
      return submitValidState(state, newState);
    }
    case 'ADD_WEAPON': {
      let newState = addWeapon(state, action.weaponData);
      return submitValidState(state, newState);
    }
    case 'REMOVE_WEAPON': {
      let newState = removeWeapon(state, action.weaponData);
      return submitValidState(state, newState);
    }
    case 'SET_DRIVE': {
      let newState = setDrive(state, action.driveData);
      return submitValidState(state, newState);
    }
    case 'REMOVE_DRIVE': {
      let newState = removeDrive(state);
      return submitValidState(state, newState);
    }
    default:
      return state;
  }
};

export default ship;

/* 
Modules should look like this:
modules: {
  <key>: {
    count: <count>,
    ...<all other module data>
  }
}

Weapons should look like this:
weapons: {
  <key>: {
    count: <count>,
    ...<all other relevant weapon data>
  }
}
*/