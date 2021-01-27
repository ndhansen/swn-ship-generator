import { connect } from "react-redux";
import Defense from "../components/Defense";
import { addDefense, removeDefense } from "../actions";
import { getShipStats } from "../selectors";

const isSelectable = (stats, defense) => {
  if (
    stats.power - defense.power < 0 ||
    stats.mass - defense.mass < 0 ||
    stats.hardpoints - defense.hardpoints < 0
  ) {
    return false;
  }
  return true;
};

const mapStatetoProps = (state, ownProps) => {
  const stats = getShipStats(state);
  let active = (ownProps.data.name in state.ship.defenses);
  return {
    active: active,
    isSelectable: isSelectable(stats, ownProps.data),
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIncrease: (data) => dispatch(addDefense(data)),
  onDecrease: (data) => dispatch(removeDefense(data)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Defense);
