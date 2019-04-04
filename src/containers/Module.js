import { connect } from 'react-redux';
import Module from '../components/Module';
import { addModule, removeModule } from '../actions'

const mapStatetoProps = (state, ownProps) => {
  let value = 0;
  if (state.ship.modules[ownProps.name]) {
    value = state.ship.modules[ownProps.name].count;
  }
  return {
    value: value,
    ...ownProps
  }
};

const mapDispatchToProps = dispatch => ({
  onIncrease: data => dispatch(addModule(data)),
  onDecrease: data => dispatch(removeModule(data))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Module);