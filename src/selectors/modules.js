import { createSelector } from "reselect";
import Modules from "../components/Modules";

const moduleData = require("../utils/data/modules.json");

const getHull = (state) => state.ship.hull;
const getModifier = (state) => state.costModifier;
const getModules = (state) => state.ship.modules;

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
      changes: element.changes,
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

export const changeFunction = (action) => {
  switch (action) {
    case "MULT":
      return (value, number, count) => value * (number + count - 1);
    case "EXP": // TODO: for the exodus bay
      return (value, number, count) => value * (number * count);
    default:
      return (value, number, count) => value + (number * count);
  }
};
