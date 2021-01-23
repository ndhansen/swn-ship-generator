import { connect } from "react-redux";
import Weapon from "../components/Weapon";
import { addWeapon, removeWeapon } from "../actions";
import { getShipStats } from "../selectors";

const canAddWeapon = (stats, weapon) => {
  if (
    stats.power - weapon.power < 0 ||
    stats.mass - weapon.mass < 0 ||
    stats.hardpoints - weapon.hardpoints < 0
  ) {
    return false;
  }
  return true;
};

const mapStatetoProps = (state, ownProps) => {
  const stats = getShipStats(state);
  let value = 0;
  if (state.ship.weapons[ownProps.data.name]) {
    value = state.ship.weapons[ownProps.data.name].count;
  }
  return {
    value: value,
    canIncrease: canAddWeapon(stats, ownProps.data),
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIncrease: (data) => dispatch(addWeapon(data)),
  onDecrease: (data) => dispatch(removeWeapon(data)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Weapon);
