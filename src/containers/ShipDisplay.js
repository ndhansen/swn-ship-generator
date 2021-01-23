import { connect } from 'react-redux';
import ShipDisplay from '../components/ShipDisplay';
import { getShipStats } from '../selectors';
import { getDefensesStats } from '../selectors/defenses';
import { getHullStats } from '../selectors/hulls';
import { getModuleStats } from '../selectors/modules';
import { getWeaponStats } from '../selectors/weapons';

const mapStateToProps = state => ({
  hull: getHullStats(state),
  modules: getModuleStats(state),
  weapons: getWeaponStats(state),
  defenses: getDefensesStats(state),
  stats: getShipStats(state),
});

export default connect(mapStateToProps)(ShipDisplay);