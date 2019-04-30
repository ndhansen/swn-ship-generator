import { connect } from 'react-redux';
import Drives from '../components/Drives';

const mapStatetoProps = (state, ownProps) => {
  return {
    hullClass: state.ship.baseStats.class,
    modifier: state.costModifier,
    speed: state.ship.baseStats.speed,
    ...ownProps
  }
};

export default connect(mapStatetoProps)(Drives);