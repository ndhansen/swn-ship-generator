import { connect } from "react-redux";
import Weapons from "../components/Weapons";
import { hullSupportsElement } from "./Modules";

const weaponData = require("../utils/data/weapons.json");

const mapStatetoProps = (state, ownProps) => {
  return {
    hullClass: state.ship.hull.class,
    modifier: state.costModifier,
    weapons: weaponData.filter((weapon) =>
      hullSupportsElement(weapon, state.ship.hull.class)
    ),
    ...ownProps,
  };
};

export default connect(mapStatetoProps)(Weapons);
