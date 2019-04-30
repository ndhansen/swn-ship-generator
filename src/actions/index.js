export const CostModifiers = {
  UNCOMMON: 'UNCOMMON',
  COMMON: 'COMMON',
  FREQUENT: 'FREQUENT',
};

export const setCostModifier = modifier => ({
  type: 'SET_COST_MODIFIER',
  modifier
});

export const setName = name => ({
  type: 'SET_NAME',
  name
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

export const addWeapon = weaponData => ({
  type: 'ADD_WEAPON',
  weaponData
});

export const removeWeapon = weaponData => ({
  type: 'REMOVE_WEAPON',
  weaponData
});

export const setSpikeDrive = driveData => ({
  type: 'SET_DRIVE',
  driveData
});

export const removeSpikeDrive = () => ({
  type: 'REMOVE_DRIVE'
});