import { connect } from "react-redux";
import Defenses from "../components/Defenses";
import { getDefensesData } from "../selectors/defenses";
import { hullSupportsElement } from "./Modules";

const mapStatetoProps = (state, ownProps) => {
  return {
    defenses: Object.entries(getDefensesData(state))
      .map(([, defense]) => defense)
      .filter((defense) => hullSupportsElement(defense, state.ship.hull.class)),
    ...ownProps,
  };
};

export default connect(mapStatetoProps)(Defenses);
