import { createSelector } from "reselect";
import { getModuleStats } from "./modules";

const getHull = (state) => state.ship.hull;

export const getCargo = createSelector(
  [getModuleStats, getHull],
  (modules, hull) => {
    let hullModifier = 1;
    switch (hull.class) {
      case "Fighter":
        hullModifier = 1;
        break;
      case "Frigate":
        hullModifier = 10;
        break;
      case "Cruiser":
        hullModifier = 100;
        break;
      case "Capital":
        hullModifier = 1000;
        break;
      default:
        hullModifier = 1;
        break;
    }

    let cargoSpace = 0;
    if ("Cargo space" in modules) {
      cargoSpace = 2 * modules["Cargo space"].count * hullModifier;
    }

    let hiddenCargoSpace = 0;
    if ("Smuggler's Hold" in modules) {
      hiddenCargoSpace = 0.2 * modules["Smuggler's Hold"].count * hullModifier;
    }

    return {
      cargoSpace,
      hiddenCargoSpace,
    }
  }
)