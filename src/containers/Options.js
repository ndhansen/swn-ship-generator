import { connect } from 'react-redux';
import Options from '../components/Options';
import { exportShip, importShip, clear } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    ...ownProps
  }
};

const mapDispatchToProps = dispatch => ({
  onExport: () => dispatch(exportShip()),
  onImport: (state) => dispatch(importShip(state)),
  clearAll: () => dispatch(clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Options)