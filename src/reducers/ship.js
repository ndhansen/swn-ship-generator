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
  modules: [],
  derivedStats: {
    cost: 0,
    power: 0,
    mass: 0,
    hardpoints: 0,
  }
};

const ship = (state = defaultShip, action) => {
  switch (action.type) {
    case 'SET_HULL_TYPE':
      return Object.assign({}, state, {baseStats: action.hullData});
    case 'ADD_MODULE':
      let newModules = [...state.modules, action.moduleData];
      return Object.assign({}, state, {modules: newModules})
    default:
      return state;
  }
};

export default ship;