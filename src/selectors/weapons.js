import { createSelector } from "reselect";

const rawWeaponData = require("../utils/data/weapons.json");

const getModifier = (state) => state.costModifier;
const getWeapons = (state) => state.ship.weapons;

export const weaponData = (modifier) => {
  const weapons = {};
  for (const [name, element] of Object.entries(rawWeaponData)) {
    weapons[name] = {
      cost: element.cost * modifier,
      ...element,
    };
  }
  return weapons;
}

export const getWeaponData = createSelector(
  getModifier,
  (modifier) => {
    return weaponData(modifier);
  }
)

export const getWeaponStats = createSelector(
  [getWeapons, getWeaponData],
  (weapons, data) => {
    const shipWeapons = {};
    for (const [name, module] of Object.entries(weapons)) {
      shipWeapons[name] = {
        ...data[name],
        count: module.count,
      };
    }
    return shipWeapons;
  }
)