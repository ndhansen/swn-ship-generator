import { connect } from "react-redux";
import Ammos from "../components/Ammos";
import { getDefensesStats } from "../selectors/defenses";
import { getWeaponStats } from "../selectors/weapons";

const mapStatetoProps = (state, ownProps) => {
  const weapons = Object.entries(getWeaponStats(state))
    .map(([, weapon]) => weapon)
    .filter((weapon) => weapon.qualities.type.includes("ammo"));
  const defenses = Object.entries(getDefensesStats(state))
    .map(([, defense]) => defense)
    .filter((defense) => defense?.qualities?.type && defense.qualities.type.includes("ammo"));
  return {
    ammos: [...weapons, ...defenses],
    ...ownProps,
  };
};

export default connect(mapStatetoProps)(Ammos);
