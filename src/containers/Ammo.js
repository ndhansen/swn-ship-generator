import { connect } from "react-redux";
import Ammo from "../components/Ammo";
import { addAmmo, removeAmmo } from "../actions";
import { getShipStats } from "../selectors";

const canAddAmmo = (stats) => {
  return stats.mass > 0;
};

const mapStatetoProps = (state, ownProps) => {
  const stats = getShipStats(state);
  let value = 0;
  if (state.ship.ammo[ownProps.data.name]) {
    value = state.ship.ammo[ownProps.data.name].count;
  }
  return {
    value: value,
    canIncrease: canAddAmmo(stats, ownProps.data),
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIncrease: (data) => dispatch(addAmmo(data)),
  onDecrease: (data) => dispatch(removeAmmo(data)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Ammo);
