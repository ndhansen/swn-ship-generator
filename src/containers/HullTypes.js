import { connect } from "react-redux";
import HullTypes from "../components/HullTypes";

const shipData = require("../utils/data/ships.json");

const mapStatetoProps = (state, ownProps) => {
  return {
    hulls: shipData,
    ...ownProps,
  };
};

export default connect(mapStatetoProps)(HullTypes);
