import { connect } from 'react-redux';
import { setCostModifier } from '../actions';
import GeneralSettings from '../components/GeneralSettings';

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setCostModifier(value))
});

export default connect(() => ({}), mapDispatchToProps)(GeneralSettings);