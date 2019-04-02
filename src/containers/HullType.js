import { connect } from 'react-redux';
import HullType from '../components/HullType';
import { setHullType } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  modifier: state.costModifier,
  active: state.ship.baseStats.hullType === ownProps.data.hullType,
  ...ownProps
});

const mapDispatchToProps = dispatch => ({
  onClick: data => dispatch(setHullType(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(HullType)