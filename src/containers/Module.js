import { connect } from "react-redux";
import Module from "../components/Module";
import { addModule, removeModule } from "../actions";
import { getShipStats } from "../selectors";

const canAddModule = (stats, module) => {
  if (stats.power - module.power < 0 || stats.mass - module.mass < 0) {
    return false;
  }
  return true;
};

const mapStatetoProps = (state, ownProps) => {
  const stats = getShipStats(state);

  let value = 0;
  if (state.ship.modules[ownProps.data.name]) {
    value = state.ship.modules[ownProps.data.name].count;
  }

  return {
    value: value,
    canIncrease: canAddModule(stats, ownProps.data),
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIncrease: (data) => dispatch(addModule(data)),
  onDecrease: (data) => dispatch(removeModule(data)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Module);
