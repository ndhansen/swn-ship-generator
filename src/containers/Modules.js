import { connect } from 'react-redux';
import Modules from '../components/Modules';

const mapStatetoProps = (state, ownProps) => {
  return {
    hullClass: state.ship.baseStats.class,
    modifier: state.costModifier,
    ...ownProps
  }
};

export default connect(mapStatetoProps)(Modules);