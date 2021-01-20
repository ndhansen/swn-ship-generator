import { connect } from 'react-redux';
import DisplayShip from '../components/DisplayShip';
import { getShipStats } from '../selectors';

const mapStateToProps = state => ({
  hull: state.ship.hull,
  modules: state.ship.modules,
  weapons: state.ship.weapons,
  stats: getShipStats(state),
});

export default connect(mapStateToProps)(DisplayShip);