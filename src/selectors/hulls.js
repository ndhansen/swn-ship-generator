import { createSelector } from "reselect";

const hullData = require("../utils/data/ships.json");

const getModifier = (state) => state.costModifier;
const getDrive = (state) => state.ship.drive;
const getHull = (state) => state.ship.hull;

export const hullDataByDrive = (drive, modifier) => {
  const driveModifier = drive?.name === "System Drive" ? 0.9 : 1;
  const ships = {};
  for (const [name, element] of Object.entries(hullData)) {
    ships[name] = {
      cost: element.cost * modifier * driveModifier,
      ...element,
    };
  }
  return ships;
}

export const getHullData = createSelector(
  [getModifier, getDrive],
  (modifier, drive) => {
    return hullDataByDrive(drive, modifier);
  }
);

export const getHullStats = createSelector(
  [getHull, getHullData],
  (hull, hulls) => {
    return hulls[hull.name];
  }
);
