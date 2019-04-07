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
  modules: {},
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
  for (let moduleName in state.modules) {
    console.log(state.modules[moduleName]);
    cost += state.modules[moduleName].cost * state.modules[moduleName].count;
    power -= state.modules[moduleName].power * state.modules[moduleName].count;
    mass -= state.modules[moduleName].mass * state.modules[moduleName].count;
  }
  return {
    cost: cost,
    power: power,
    mass: mass,
    hardpoints: 0
  }
}

const isValidState = (state) => {
  if (state.derivedStats.power < 0 || 
      state.derivedStats.mass < 0 ||
      state.derivedStats.hardpoints < 0 ||
      state.derivedStats.power > state.baseStats.power ||
      state.derivedStats.mass > state.baseStats.mass ||
      state.derivedStats.hardpoints > state.baseStats.mass) {
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

const ship = (state = defaultShip, action) => {
  switch (action.type) {
    case 'SET_HULL_TYPE':
      let newState = Object.assign({}, state, {baseStats: action.hullData, modules: {}});
      return submitValidState(state, newState);
    case 'ADD_MODULE':
      if (state.modules[action.moduleData.name]) {
        // If the module already is in there
        let newState = {
          ...state,
          modules: {
            ...state.modules,
            [action.moduleData.name]: {
              ...state.modules[action.moduleData.name],
              count: state.modules[action.moduleData.name].count + 1
            }
          },
        }
        return submitValidState(state, newState);
      } else {
        // Otherwise, add a new module
        let newState = {
          ...state,
          modules: {
            ...state.modules,
            [action.moduleData.name]: {
              cost: action.moduleData.cost,
              power: action.moduleData.power,
              mass: action.moduleData.mass,
              description: action.moduleData.description,
              count: 1,
            }
          }
        }
        return submitValidState(state, newState);
      }
    case 'REMOVE_MODULE':
      if (state.modules[action.moduleData.name].count > 1) {
        let newState = {
          ...state,
          modules: {
            ...state.modules,
            [action.moduleData.name]: {
              ...state.modules[action.moduleData.name],
              count: state.modules[action.moduleData.name].count - 1
            }
          },
        }
        return submitValidState(state, newState);
      } else {
        const { [action.moduleData.name]: value, ...newModules } = state.modules;
        let newState = {
          ...state,
          modules: {
            ...newModules
          },
        }
        return submitValidState(state, newState);
      }
    default:
      return state;
  }
};

export default ship;

/* Modules should look like this:
modules: {
  <key>: {
    count: <count>,
    ...<all other module data>
  }
}
*/