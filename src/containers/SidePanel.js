import { connect } from 'react-redux';
import SidePanel from '../components/SidePanel';
import { getShipStats } from '../selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    hullType: state.ship.hull.class,
    stats: getShipStats(state),
    ...ownProps
  }
};

export default connect(mapStateToProps)(SidePanel)