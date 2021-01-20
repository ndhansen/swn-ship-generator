import { createSelector } from "reselect";
import Modules from "../components/Modules";

const driveData = require("../utils/data/drives.json");
const moduleData = require("../utils/data/modules.json");

const getModifier = (state) => state.costModifier;
const getShip = (state) => state.ship;
const getModules = (state) => state.ship.modules;
const getWeapons = (state) => state.ship.weapons;
const getDrive = (state) => state.ship.drive;
const getHull = (state) => state.ship.hull;

export const calcShipStats = (hull, ship, modifier) => {
  let cost = hull.cost * modifier;
  let power = hull.power;
  let mass = hull.mass;
  let hardpoints = hull.hardpoints;

  // Check modules
  const modules = moduleDataByHull(hull, modifier);
  for (let moduleName in ship.modules) {
    cost += modules[moduleName].cost * ship.modules[moduleName].count;
    power -= modules[moduleName].power * ship.modules[moduleName].count;
    mass -= modules[moduleName].mass * ship.modules[moduleName].count;
  }

  // Check weapons
  for (let weaponName in ship.weapons) {
    cost +=
      ship.weapons[weaponName].cost * ship.weapons[weaponName].count * modifier;
    power -= ship.weapons[weaponName].power * ship.weapons[weaponName].count;
    mass -= ship.weapons[weaponName].mass * ship.weapons[weaponName].count;
    hardpoints -=
      ship.weapons[weaponName].hardpoints * ship.weapons[weaponName].count;
  }

  // Check drive
  if (
    !(
      Object.entries(ship.drive).length === 0 &&
      ship.drive.constructor === Object
    )
  ) {
    let drives = driveDataByHull(hull, modifier);
    cost += drives[ship.drive.name].cost;
    power -= drives[ship.drive.name].power;
    mass -= drives[ship.drive.name].mass;
  }

  // Check defenses

  return {
    cost: cost,
    power: power,
    mass: mass,
    hardpoints: hardpoints,
  };
};

export const calcValidShip = (stats, hull) => {
  if (stats.power < 0 || stats.mass < 0 || stats.hardpoints < 0) {
    return false;
  }
  return true;
};

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

export const moduleDataByHull = (hull, modifier) => {
  const modules = {};
  for (const [name, element] of Object.entries(moduleData)) {
    modules[name] = {
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
      extra: element.extra,
    };
  }
  return modules;
};

export const getModuleData = createSelector(
  [getHull, getModifier],
  (hull, modifier) => {
    return moduleDataByHull(hull, modifier);
  }
);

export const getShipStats = createSelector(
  [getShip, getModifier],
  (ship, modifier) => {
    return calcShipStats(ship.hull, ship, modifier);
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

export const getModuleStats = createSelector(
  [getModules, getModuleData],
  (modules, moduleData) => {
    const shipModules = {};
    for (const [name, module] of Object.entries(modules)) {
      shipModules[name] = {
        ...moduleData[name],
        count: module.count,
      };
    }
    return shipModules;
  }
);
