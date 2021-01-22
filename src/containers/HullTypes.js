import { connect } from "react-redux";
import HullTypes from "../components/HullTypes";
import { getHullData } from "../selectors/hulls";

const mapStatetoProps = (state, ownProps) => {
  return {
    hulls: Object.entries(getHullData(state)).map(([, hull]) => hull),
    ...ownProps,
  };
};

export default connect(mapStatetoProps)(HullTypes);
