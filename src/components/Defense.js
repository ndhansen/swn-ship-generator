import React, { Component } from "react";
import PropTypes from "prop-types";
import formatCost from "../utils/formatCost";
import { Button } from 'reactstrap';

class Defense extends Component {
  constructor() {
    super();
    this.selectDefense = this.selectDefense.bind(this);
  }
  
  selectDefense() {
    const data = {
      name: this.props.data.name,
    };
    if (!this.props.active && this.props.isSelectable) {
      this.props.onIncrease(data);
    } else if (this.props.active) {
      this.props.onDecrease(data);
    }
  }

  render() {
    let cost = `${formatCost(this.props.data.cost)}`;
    if (
      this.props.data?.qualities?.type &&
      this.props.data?.qualities?.type.includes("ammo")
    ) {
      cost += ` / ${formatCost(this.props.data.qualities.ammoCost)}`;
    }

    return (
      <tr>
        <td>{this.props.data.name}</td>
        <td>{cost}</td>
        <td>{this.props.data.power}</td>
        <td>{this.props.data.mass}</td>
        <td>{this.props.data.description}</td>
        <td>
          <Button
            outline
            disabled={!this.props.active && !this.props.isSelectable}
            color="primary"
            size="sm"
            onClick={this.selectDefense}
            active={this.props.active}
            style={{width: "100%"}}>
            Select
          </Button>
        </td>
      </tr>
    );
  }
}

Defense.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    minClass: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    extra: PropTypes.shape({
      max: PropTypes.number,
    }),
    qualities: PropTypes.shape({
      type: PropTypes.arrayOf(PropTypes.string.isRequired),
      ammo: PropTypes.number,
      ammoCost: PropTypes.number,
    }),
  }).isRequired,
  active: PropTypes.bool.isRequired,
  isSelectable: PropTypes.bool.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export default Defense;
