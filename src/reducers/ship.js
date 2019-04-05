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
  state.modules.forEach(module => {
    cost += module.cost * module.count;
    power += module.power * module.count;
    mass += module.mass * module.count;
  });
  return {
    cost: cost,
    power: power,
    mass: mass,
    hardpoints: 0
  }
}

const ship = (state = defaultShip, action) => {
  switch (action.type) {
    case 'SET_HULL_TYPE':
      return Object.assign({}, state, {baseStats: action.hullData, modules: {}, derivedStats: getDerivedStats(state)});
    case 'ADD_MODULE':
      if (state.modules[action.moduleData.name]) {
        // If the module already is in there
        return {
          ...state,
          modules: {
            ...state.modules,
            [action.moduleData.name]: {
              ...state.modules[action.moduleData.name],
              count: state.modules[action.moduleData.name].count + 1
            }
          },
          derivedStats: getDerivedStats(state)
        }
      } else {
        // Otherwise, add a new module
        return {
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
          },
          derivedStats: getDerivedStats(state)
        }
      }
    case 'REMOVE_MODULE':
      if (state.modules[action.moduleData.name].count > 1) {
        return {
          ...state,
          modules: {
            ...state.modules,
            [action.moduleData.name]: {
              ...state.modules[action.moduleData.name],
              count: state.modules[action.moduleData.name].count - 1
            }
          },
          derivedStats: getDerivedStats(state)
        }
      } else {
        const { [action.moduleData.name]: value, ...newModules } = state.modules;
        return {
          ...state,
          modules: {
            ...newModules
          },
          derivedStats: getDerivedStats(state)
        }
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