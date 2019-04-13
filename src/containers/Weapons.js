import { connect } from 'react-redux';
import Weapons from '../components/Weapons';

const mapStatetoProps = (state, ownProps) => {
  return {
    hullClass: state.ship.baseStats.class,
    modifier: state.costModifier,
    ...ownProps
  }
};

export default connect(mapStatetoProps)(Weapons);