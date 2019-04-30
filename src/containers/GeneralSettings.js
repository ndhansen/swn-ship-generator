import { connect } from 'react-redux';
import { setCostModifier, setName } from '../actions';
import GeneralSettings from '../components/GeneralSettings';

const mapDispatchToProps = dispatch => ({
  setCostModifier: value => dispatch(setCostModifier(value)),
  setName: value => dispatch(setName(value))
});

export default connect(() => ({}), mapDispatchToProps)(GeneralSettings);