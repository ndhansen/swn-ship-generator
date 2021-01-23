import { connect } from 'react-redux';
import SmallShipDisplay from '../components/SmallShipDisplay';
import { getShipStats } from '../selectors';

const mapStateToProps = state => ({
  hull: state.ship.hull,
  modules: state.ship.modules,
  weapons: state.ship.weapons,
  defenses: state.ship.defenses,
  stats: getShipStats(state),
});

export default connect(mapStateToProps)(SmallShipDisplay);