import { connect } from 'react-redux';
import DisplayShip from '../components/DisplayShip';

const mapStateToProps = state => ({
  shipStats: state.ship.baseStats
});

export default connect(mapStateToProps)(DisplayShip);