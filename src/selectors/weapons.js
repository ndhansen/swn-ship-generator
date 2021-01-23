import { createSelector } from "reselect";
import Ammos from "../components/Ammos";

const rawWeaponData = require("../utils/data/weapons.json");

const getHull = (state) => state.ship.hull;
const getModifier = (state) => state.costModifier;
const getWeapons = (state) => state.ship.weapons;

export const weaponDataByHull = (hull, modifier) => {
  const weapons = {};
  for (const [name, element] of Object.entries(rawWeaponData)) {
    weapons[name] = {
      ...element,
      cost: element.cost * modifier,
      qualities: {
        ...element.qualities
      },
    };
    if (element?.qualities?.type && element.qualities.type.includes("ammo")) {
      weapons[name].qualities.ammoCost = element.qualities.ammoCost * modifier;
      weapons[name].qualities.ammo =
        element.qualities.ammo *
        (2 ** Ammos.ammoCountDifference(hull?.class, element.minClass));
      weapons[name].qualities.totalAmmoCost =
        weapons[name].qualities.ammoCost * weapons[name].qualities.ammo;
    }
  }
  return weapons;
};

export const getWeaponData = createSelector(
  [getHull, getModifier],
  (hull, modifier) => {
  return weaponDataByHull(hull, modifier);
});

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
);
