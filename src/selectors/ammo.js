import { getWeaponStats } from "./weapons";
import { createSelector } from "reselect";

const getAmmo = (state) => state.ship.ammo;

export const getAmmoStats = createSelector(
  [getWeaponStats, getAmmo],
  (weapons, ammo) => {
    const shipAmmo = {};
    for (const [name, module] of Object.entries(ammo)) {
      shipAmmo[name] = {
        ...weapons[name].qualities,
        count: module.count,
      };
    }
    return shipAmmo;
  }
)