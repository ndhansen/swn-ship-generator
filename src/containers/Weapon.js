import { connect } from 'react-redux';
import Weapon from '../components/Weapon';
import { addWeapon, removeWeapon } from '../actions'

const mapStatetoProps = (state, ownProps) => {
  let value = 0;
  if (state.ship.weapons[ownProps.name]) {
    value = state.ship.weapons[ownProps.name].count;
  }
  return {
    value: value,
    ...ownProps
  }
};

const mapDispatchToProps = dispatch => ({
  onIncrease: data => dispatch(addWeapon(data)),
  onDecrease: data => dispatch(removeWeapon(data))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Weapon);