import { createSelector } from "reselect";
import { getDefensesStats } from "./defenses";
import { changeFunction, getModuleStats } from "./modules";

const hullData = require("../utils/data/ships.json");

const getModifier = (state) => state.costModifier;
const getDrive = (state) => state.ship.drive;
const getHull = (state) => state.ship.hull;

export const hullDataByDrive = (drive, modifier) => {
  const driveModifier = drive?.name === "System Drive" ? 0.9 : 1;
  const ships = {};
  for (const [name, element] of Object.entries(hullData)) {
    ships[name] = {
      ...element,
      cost: element.cost * modifier * driveModifier,
    };
  }
  return ships;
};

export const getHullData = createSelector(
  [getModifier, getDrive],
  (modifier, drive) => {
    return hullDataByDrive(drive, modifier);
  }
);

export const getHullStats = createSelector(
  [getHull, getHullData, getDefensesStats, getModuleStats],
  (shipHull, hullData, defenses, modules) => {
    const hull = {
      ...hullData[shipHull.name]
    };

    // Add defenses
    for (const [, defense] of Object.entries(defenses)) {
      if (defense.changes) {
        for (let change of defense.changes) {
          hull[change.target] += change.amount;
        }
      }
    }

    // Add module modifications
    for (const [, module] of Object.entries(modules)) {
      if (module.changes) {
        for (let change of module.changes) {
          for (let i = 0; i < module.count; i++) {
            hull[change.target] = changeFunction(change.action)(
              hull[change.target],
              change.amount
            );
          }
        }
      }
    }

    return hull;
  }
);
