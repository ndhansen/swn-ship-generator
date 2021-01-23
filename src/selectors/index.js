import { createSelector } from "reselect";
import { moduleDataByHull } from "./modules";
import { driveDataByHull } from "./drives";
import { hullDataByDrive } from "./hulls";
import { weaponDataByHull } from "./weapons";
import { defensesDataByHull } from "./defenses";

const getModifier = (state) => state.costModifier;
const getShip = (state) => state.ship;

export const calcShipStats = (hull, ship, modifier) => {
  // Just return if there's no hull yet
  if (hull?.name === undefined) {
    return {};
  }

  // Get hull data
  const hullData = hullDataByDrive(ship.drive, modifier);
  const stats = hullData[hull.name];

  // Check modules
  const modules = moduleDataByHull(hull, modifier);
  for (let moduleName in ship.modules) {
    stats.cost += modules[moduleName].cost * ship.modules[moduleName].count;
    stats.power -= modules[moduleName].power * ship.modules[moduleName].count;
    stats.mass -= modules[moduleName].mass * ship.modules[moduleName].count;
  }

  // Check weapons
  const weapons = weaponDataByHull(hull, modifier);
  for (let weaponName in ship.weapons) {
    stats.cost += weapons[weaponName].cost * ship.weapons[weaponName].count;
    stats.power -= weapons[weaponName].power * ship.weapons[weaponName].count;
    stats.mass -= weapons[weaponName].mass * ship.weapons[weaponName].count;
    stats.hardpoints -=
      weapons[weaponName].hardpoints * ship.weapons[weaponName].count;
  }

  // Check drive
  if (
    !(
      Object.entries(ship.drive).length === 0 &&
      ship.drive.constructor === Object
    )
  ) {
    let drives = driveDataByHull(hull, modifier);
    stats.cost += drives[ship.drive.name].cost;
    stats.power -= drives[ship.drive.name].power;
    stats.mass -= drives[ship.drive.name].mass;
  }

  // Check defenses
  const defenses = defensesDataByHull(hull, modifier);
  for (const defenseName in ship.defenses) {
    stats.cost += defenses[defenseName].cost * ship.defenses[defenseName].count;
    stats.power -=
      defenses[defenseName].mass * ship.defenses[defenseName].count;
    stats.mass -= defenses[defenseName].mass * ship.defenses[defenseName].count;
    let changes = defenses[defenseName].changes;
    if (changes) {
      for (const change of changes) {
        stats[change.target] += change.amount;
      }
    }
  }

  // Check ammo
  const ammoConsumers = { ...weapons, ...defenses };
  for (let ammoName in ship.ammo) {
    stats.cost +=
      ammoConsumers[ammoName].qualities.totalAmmoCost *
      ship.ammo[ammoName].count;
    stats.mass -= ship.ammo[ammoName].count;
  }

  return stats;
};

export const calcValidShip = (stats, hull) => {
  if (stats.power < 0 || stats.mass < 0 || stats.hardpoints < 0) {
    return false;
  }
  return true;
};

export const getShipStats = createSelector(
  // TODO: Just pass in all the different component stats instead of doing it redundantly
  [getShip, getModifier],
  (ship, modifier) => {
    return calcShipStats(ship.hull, ship, modifier);
  }
);
