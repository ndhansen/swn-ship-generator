import { connect } from 'react-redux';
import ShipDisplay from '../components/ShipDisplay';
import { getShipStats } from '../selectors';
import { getDefensesStats } from '../selectors/defenses';
import { getHullStats, getRawHullStats } from '../selectors/hulls';
import { getModuleStats } from '../selectors/modules';
import { getWeaponStats } from '../selectors/weapons';
import { getDriveStats } from '../selectors/drives';
import { getCargo } from '../selectors/cargo';
import { getAmmoStats } from '../selectors/ammo';

const mapStateToProps = state => ({
  name: state.name,
  rawHull: getRawHullStats(state),
  hull: getHullStats(state),
  cargo: getCargo(state),
  drive: getDriveStats(state),
  modules: getModuleStats(state),
  weapons: getWeaponStats(state),
  defenses: getDefensesStats(state),
  ammo: getAmmoStats(state),
  stats: getShipStats(state),
});

export default connect(mapStateToProps)(ShipDisplay);