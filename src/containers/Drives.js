import { connect } from "react-redux";
import Drives from "../components/Drives";
import { getShipStats, getDriveData } from "../selectors";
import { hullSupportsElement } from "./Modules";

const mapStatetoProps = (state, ownProps) => {
  return {
    hullClass: state.ship.hull.class,
    modifier: state.costModifier,
    speed: getShipStats(state).speed,
    // drives: driveData.filter(
    drives: Object.entries(getDriveData(state))
      .map(([, element]) => element)
      .filter(
        (drive) =>
          hullSupportsElement(drive, state.ship.hull.class) &&
          state.ship.hull.type !== "station"
      ),
    ...ownProps,
  };
};

export default connect(mapStatetoProps)(Drives);
