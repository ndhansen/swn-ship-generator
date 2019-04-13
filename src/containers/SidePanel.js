import { connect } from 'react-redux';
import SidePanel from '../components/SidePanel';

const mapStateToProps = (state, ownProps) => {
  return {
    hullType: state.ship.baseStats.class,
    mass: state.ship.derivedStats.mass,
    power: state.ship.derivedStats.power,
    hardpoints: state.ship.derivedStats.hardpoints,
    ...ownProps
  }
};

export default connect(mapStateToProps)(SidePanel)