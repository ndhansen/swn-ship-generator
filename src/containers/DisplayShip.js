import { connect } from 'react-redux';
import DisplayShip from '../components/DisplayShip';

const mapStateToProps = state => ({
  shipStats: state.ship.baseStats,
  modules: state.ship.modules,
  weapons: state.ship.weapons
});

export default connect(mapStateToProps)(DisplayShip);