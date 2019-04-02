export const CostModifiers = {
  UNCOMMON: 'UNCOMMON',
  COMMON: 'COMMON',
  FREQUENT: 'FREQUENT',
};

export const setCostModifier = modifier => ({
  type: 'SET_COST_MODIFIER',
  modifier
});

export const setHullType = hullData => ({
  type: 'SET_HULL_TYPE',
  hullData
});

export const addModule = moduleData => ({
  type: 'ADD_MODULE',
  moduleData
});

export const removeModule = moduleData => ({
  type: 'REMOVE_MODULE',
  moduleData
});