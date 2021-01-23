export const CostModifiers = {
  UNCOMMON: 1,
  COMMON: 0.5,
  FREQUENT: 0.25,
};

export const setCostModifier = modifier => ({
  type: 'SET_COST_MODIFIER',
  modifier,
});

export const clear = () => ({
  type: 'CLEAR',
});

export const setName = name => ({
  type: 'SET_NAME',
  name,
});

export const setHullType = hullData => ({
  type: 'SET_HULL_TYPE',
  hullData,
});

export const addModule = moduleData => ({
  type: 'ADD_MODULE',
  moduleData,
});

export const removeModule = moduleData => ({
  type: 'REMOVE_MODULE',
  moduleData,
});

export const addWeapon = weaponData => ({
  type: 'ADD_WEAPON',
  weaponData,
});

export const removeWeapon = weaponData => ({
  type: 'REMOVE_WEAPON',
  weaponData,
});

export const addDefense = defenseData => ({
  type: 'ADD_DEFENSE',
  defenseData,
});

export const removeDefense = defenseData => ({
  type: 'REMOVE_DEFENSE',
  defenseData,
});

export const addAmmo = ammoData => ({
  type: 'ADD_AMMO',
  ammoData,
});

export const removeAmmo = ammoData => ({
  type: 'REMOVE_AMMO',
  ammoData,
});

export const setSpikeDrive = driveData => ({
  type: 'SET_DRIVE',
  driveData,
});

export const removeSpikeDrive = () => ({
  type: 'REMOVE_DRIVE',
});

export const exportShip = () => ({
  type: 'EXPORT_SHIP',
})

export const importShip = state => ({
  type: 'IMPORT_SHIP',
  state,
})