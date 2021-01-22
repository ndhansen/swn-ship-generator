import { connect } from "react-redux";
import Weapons from "../components/Weapons";
import { getWeaponData } from "../selectors/weapons";
import { hullSupportsElement } from "./Modules";

const mapStatetoProps = (state, ownProps) => {
  return {
    hullClass: state.ship.hull.class,
    modifier: state.costModifier,
    weapons: Object.entries(getWeaponData(state))
      .map(([, weapon]) => weapon)
      .filter((weapon) => hullSupportsElement(weapon, state.ship.hull.class)),
    ...ownProps,
  };
};

export default connect(mapStatetoProps)(Weapons);
