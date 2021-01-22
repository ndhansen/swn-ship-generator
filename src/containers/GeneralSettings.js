import { connect } from 'react-redux';
import { setCostModifier, setName } from '../actions';
import GeneralSettings from '../components/GeneralSettings';

const mapStateToProps = (state, ownProps) => ({
  name: state.name,
  costModifier: state.costModifier,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  setCostModifier: value => dispatch(setCostModifier(value)),
  setName: value => dispatch(setName(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);