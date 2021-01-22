import { createSelector } from "reselect";
import { moduleDataByHull } from "./modules";
import { driveDataByHull } from "./drives";
import { hullDataByDrive } from "./hulls";
import { weaponData } from "./weapons";

const getModifier = (state) => state.costModifier;
const getShip = (state) => state.ship;

export const calcShipStats = (hull, ship, modifier) => {
  // Just return if there's no hull yet
  if (hull?.name === undefined) {
    return {}
  }

  // Get hull data
  const hullData = hullDataByDrive(ship.drive, modifier);
  const shipHull = hullData[hull.name];
  let cost = shipHull.cost;
  let power = shipHull.power;
  let mass = shipHull.mass;
  let hardpoints = shipHull.hardpoints;

  // Check modules
  const modules = moduleDataByHull(hull, modifier);
  for (let moduleName in ship.modules) {
    cost += modules[moduleName].cost * ship.modules[moduleName].count;
    power -= modules[moduleName].power * ship.modules[moduleName].count;
    mass -= modules[moduleName].mass * ship.modules[moduleName].count;
  }

  // Check weapons
  const weapons = weaponData(modifier);
  for (let weaponName in ship.weapons) {
    cost += weapons[weaponName].cost * ship.weapons[weaponName].count;
    power -= weapons[weaponName].power * ship.weapons[weaponName].count;
    mass -= weapons[weaponName].mass * ship.weapons[weaponName].count;
    hardpoints -= weapons[weaponName].hardpoints * ship.weapons[weaponName].count;
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

export const getShipStats = createSelector(
  [getShip, getModifier],
  (ship, modifier) => {
    return calcShipStats(ship.hull, ship, modifier);
  }
);
