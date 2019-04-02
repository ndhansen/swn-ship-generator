import { connect } from 'react-redux';
import Module from '../components/Module';
import { addModule } from '../actions'

const mapStateToProps = (state, ownProps) => ({
  
});

const mapDispatchToProps = dispatch => ({
  onIncrease: data => dispatch(addModule(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Module);