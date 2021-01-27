import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import formatCost from "../utils/formatCost";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

class Module extends Component {
  constructor() {
    super();
    this.moduleChanged = this.moduleChanged.bind(this);
    this.toggleModule = this.toggleModule.bind(this);
  }

  moduleChanged(count) {
    let data = {
      name: this.props.data.name,
    };
    if (this.props.canIncrease && count > this.props.value) {
      this.props.onIncrease(data);
    } else if (count < this.props.value) {
      this.props.onDecrease(data);
    }
  }

  toggleModule(active) {
    if (active) {
      this.moduleChanged(0);
    } else {
      this.moduleChanged(1);
    }
  }

  render() {
    let input;
    if (this.props.data.extra && this.props.data.extra.max === 1) {
      let active = this.props.value > 0;
      input = (
        <Button
          outline
          disabled={!active && !this.props.canIncrease}
          color={"primary"}
          size="sm"
          onClick={() => this.toggleModule(active)}
          active={active}
          style={{ width: "100%" }}
        >
          Select
        </Button>
      );
    } else {
      input = (
        <div>
          {this.props.value}
          <AddCircleIcon
            color={this.props.canIncrease ? "primary" : "disabled"}
            onClick={(e) => {
              this.moduleChanged(this.props.value + 1);
            }}
          />
          <RemoveCircleIcon
            color={this.props.value > 0 ? "primary" : "disabled"}
            onClick={(e) => {
              this.moduleChanged(this.props.value - 1);
            }}
          />
        </div>
      );
    }

    return (
      <tr>
        <td>{this.props.data.name}</td>
        <td style={{textAlign: "right"}}>{formatCost(this.props.data.cost)}</td>
        <td>{this.props.data.power}</td>
        <td>{this.props.data.mass}</td>
        <td>{this.props.data.description}</td>
        <td>{input}</td>
      </tr>
    );
  }
}

Module.propTypes = {
  value: PropTypes.number.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    minClass: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    extra: PropTypes.shape({
      max: PropTypes.number,
      maxClass: PropTypes.string,
    }),
  }).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export default Module;
