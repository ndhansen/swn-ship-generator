import { createSelector } from "reselect";
import Modules from "../components/Modules";
import Ammos from "../components/Ammos";

const defensesData = require("../utils/data/defenses.json");

const getHull = (state) => state.ship.hull;
const getModifier = (state) => state.costModifier;
const getDefenses = (state) => state.ship.defenses;

export const defensesDataByHull = (hull, modifier) => {
  const defenses = {};
  for (const [name, element] of Object.entries(defensesData)) {
    defenses[name] = {
      name: element.name,
      cost:
        Modules.moduleCostModifier(
          hull.class,
          element.costModifier,
          element.cost
        ) * modifier,
      power: element.power,
      mass: Modules.powerMassCostModifier(
        hull.class,
        element.massModifier,
        element.mass
      ),
      minClass: element.minClass,
      description: element.description,
    };
    if (element.changes) {
      defenses[name].changes = element.changes;
    }
    if (element.qualities) {
      defenses[name].qualities = { ...element.qualities };
    }
    if (element?.qualities?.type && element.qualities.type.includes("ammo")) {
      defenses[name].qualities.ammoCost = element.qualities.ammoCost * modifier;
      defenses[name].qualities.ammo =
        element.qualities.ammo *
        (2 ** Ammos.ammoCountDifference(hull?.class, element.minClass));
      defenses[name].qualities.totalAmmoCost =
        defenses[name].qualities.ammoCost * defenses[name].qualities.ammo;
    }
  }
  return defenses;
};

export const getDefensesData = createSelector(
  [getHull, getModifier],
  (hull, modifier) => {
    return defensesDataByHull(hull, modifier);
  }
);

export const getDefensesStats = createSelector(
  [getDefenses, getDefensesData],
  (defenses, defensesData) => {
    const shipDefenses = {};
    for (const [name, defense] of Object.entries(defenses)) {
      shipDefenses[name] = {
        ...defensesData[name],
        count: defense.count,
      };
    }
    return shipDefenses;
  }
);