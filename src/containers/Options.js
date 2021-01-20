import { connect } from 'react-redux';
import Options from '../components/Options';
import { exportShip, importShip } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    ship: state.ship,
    ...ownProps
  }
};

const mapDispatchToProps = dispatch => ({
  onExport: () => dispatch(exportShip()),
  onImport: () => dispatch(importShip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Options)