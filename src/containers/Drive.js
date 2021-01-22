import { connect } from "react-redux";
import Drive from "../components/Drive";
import { setSpikeDrive, removeSpikeDrive } from "../actions";
import { getShipStats } from "../selectors";
import { getDriveStats } from "../selectors/drives";

const isSelectable = (stats, oldDrive, newDrive) => {
  if (
    stats.power + oldDrive.power - newDrive.power < 0 ||
    stats.mass + oldDrive.mass - newDrive.mass < 0
  ) {
    return false;
  }
  return true;
};

const mapStatetoProps = (state, ownProps) => {
  let stats = getShipStats(state);
  let driveStats = getDriveStats(state);
  let active = ownProps.data.name === state.ship.drive.name;
  return {
    active: active,
    isSelectable: isSelectable(stats, driveStats, ownProps.data),
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSelect: (data) => dispatch(setSpikeDrive(data)),
  onDeselect: () => dispatch(removeSpikeDrive()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Drive);
