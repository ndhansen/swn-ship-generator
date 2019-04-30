import { connect } from 'react-redux';
import Drive from '../components/Drive';
import { setSpikeDrive, removeSpikeDrive } from '../actions'

const mapStatetoProps = (state, ownProps) => {
  let active = ownProps.name === state.ship.drive.name;
  return {
    active: active,
    ...ownProps
  }
};

const mapDispatchToProps = dispatch => ({
  onSelect: data => dispatch(setSpikeDrive(data)),
  onDeselect: () => dispatch(removeSpikeDrive())
});

export default connect(mapStatetoProps, mapDispatchToProps)(Drive);