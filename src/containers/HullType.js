import { connect } from "react-redux";
import HullType from "../components/HullType";
import { setHullType, removeSpikeDrive } from "../actions";
import { calcShipStats, calcValidShip, getDriveStats, getModuleStats } from "../selectors";
import { hullSupportsElement } from "./Modules";

const isSelectable = (hull, ship, drive, modules) => {
  // If there's no selected hull, make all available.
  if (!ship.hull) {
    return true;
  }

  // Check if the ship has any modules that are incompatible.
  for (const [, module] of Object.entries(modules)) {
    if (!hullSupportsElement(module, hull.class)) {
      return false;
    }
  }

  // Check if any of the drives are incompatible
  if (!hullSupportsElement(drive, hull.class)) {
    return false;
  }

  // Check if any of the weapons are incompatible
  for (const [, weapon] of Object.entries(ship.weapons)) {
    if (!hullSupportsElement(weapon, hull.class)) {
      return false;
    }
  }

  let newStats = calcShipStats(hull, ship);
  return calcValidShip(newStats, hull);
};

const mapStateToProps = (state, ownProps) => {
  const drive = getDriveStats(state);
  const modules = getModuleStats(state);
  return {
    modifier: state.costModifier,
    isSelectable: isSelectable(ownProps.data, state.ship, drive, modules),
    active: state.ship.hull?.name === ownProps.data.name,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClick: (data) => {
    if (data.type === "station") {
      dispatch(removeSpikeDrive());
    }
    dispatch(setHullType(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HullType);
