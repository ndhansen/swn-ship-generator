import { connect } from "react-redux";
import HullTypes from "../components/HullTypes";
import Modules from "../components/Modules";
import { getModuleData } from "../selectors";

export const hullSupportsElement = (element, shipHull) => {
  // If no ship hull, return false
  if (!shipHull) {
    return false;
  }
  // This module won't work on a too small ship
  if (
    HullTypes.getHullValue(element.minClass) > HullTypes.getHullValue(shipHull)
  ) {
    return false;
  }
  // This module won't work on a too big ship
  if (
    element.extra?.maxClass &&
    HullTypes.getHullValue(element.extra.maxClass) <
      HullTypes.getHullValue(shipHull)
  ) {
    return false;
  }
  return true;
};

const mapStatetoProps = (state, ownProps) => {
  return {
    hullClass: state.ship.hull.class,
    modifier: state.costModifier,
    modules: Object.entries(getModuleData(state))
      .map(([, element]) => element)
      .filter((element) => hullSupportsElement(element, state.ship.hull.class)),
    ...ownProps,
  };
};

export default connect(mapStatetoProps)(Modules);
