import { createSelector } from "reselect";
import Modules from "../components/Modules";

const driveData = require("../utils/data/drives.json");

const getDrive = (state) => state.ship.drive;
const getModifier = (state) => state.costModifier;
const getHull = (state) => state.ship.hull;

export const driveDataByHull = (hull, modifier) => {
  const drives = {};
  for (const [name, element] of Object.entries(driveData)) {
    drives[name] = {
      name: element.name,
      cost:
        Modules.moduleCostModifier(
          hull.class,
          element.costModifier,
          element.cost
        ) * modifier,
      power: Modules.powerMassCostModifier(
        hull.class,
        element.powerModifier,
        element.power
      ),
      mass: Modules.powerMassCostModifier(
        hull.class,
        element.massModifier,
        element.mass
      ),
      minClass: element.minClass,
      description: element.description,
    };
  }
  return drives;
};

export const getDriveData = createSelector(
  [getHull, getModifier],
  (hull, modifier) => {
    return driveDataByHull(hull, modifier);
  }
);

export const getDriveStats = createSelector(
  [getDrive, getModifier, getHull],
  (shipDrive, modifier, hull) => {
    if (
      Object.entries(shipDrive).length === 0 &&
      shipDrive.constructor === Object
    ) {
      return {};
    }
    const drives = driveDataByHull(hull, modifier);
    return drives[shipDrive.name];
  }
);