import { connect } from "react-redux";
import Drives from "../components/Drives";
import { getShipStats } from "../selectors";
import { getDriveData } from "../selectors/drives";
import { hullSupportsElement } from "./Modules";

const mapStatetoProps = (state, ownProps) => {
  return {
    speed: getShipStats(state).speed,
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
