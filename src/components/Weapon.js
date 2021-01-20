import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatCost from '../utils/formatCost';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

class Weapon extends Component {
  constructor() {
    super();
    this.weaponChanged = this.weaponChanged.bind(this);
  }

  weaponChanged(count) {
    if (count > this.props.value && this.props.canIncrease) {
      this.props.onIncrease(this.props.data);
    } else if (count < this.props.value) {
      this.props.onDecrease(this.props.data);
    }
  }

  render() {
    let input = (
      <div>
        {this.props.value}
        <AddCircleIcon
          color={this.props.canIncrease ? "primary" : "disabled"}
          onClick={(e) => {this.weaponChanged(this.props.value + 1)}}
        />
        <RemoveCircleIcon
          color={this.props.value > 0 ? "primary" : "disabled"}
          onClick={(e) => {this.weaponChanged(this.props.value - 1)}}
        />
      </div>
    )

    let qualities = "";
    let length = this.props.data.qualities.type.length;
    this.props.data.qualities.type.forEach((type, index) => {
      if (type === "ap") {
        qualities += `AP ${this.props.data.qualities.ap}`;
      }
      else if (type === "ammo") {
        qualities += `Ammo ${this.props.data.qualities.ammo}`;
      }
      else {
        qualities += type;
      }

      if (index !== length-1) {
        qualities += ", ";
      }
    });

    let cost = `${formatCost(this.props.data.cost * this.props.modifier)}`;
    if (this.props.data.qualities.type.includes("ammo")) {
      cost += ` / ${formatCost(this.props.data.qualities.ammoCost)}`;
    }

    return (
      <tr>
        <td>{this.props.data.name}</td>
        <td>{cost}</td>
        <td>{this.props.data.damage}</td>
        <td>{this.props.data.power}</td>
        <td>{this.props.data.mass}</td>
        <td>{this.props.data.hardpoints}</td>
        <td>{this.props.data.techLevel}</td>
        <td>{qualities}</td>
        <td>{input}</td>
      </tr>
    )
  }
}

Weapon.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    damage: PropTypes.string.isRequired,
    power: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    hardpoints: PropTypes.number.isRequired,
    minClass: PropTypes.string.isRequired,
    techLevel: PropTypes.number.isRequired,
    qualities: PropTypes.shape({
      type: PropTypes.arrayOf(PropTypes.string.isRequired),
      ap: PropTypes.number,
      ammo: PropTypes.number,
      ammoCost: PropTypes.number,
    }).isRequired,
  }).isRequired,
  value: PropTypes.number.isRequired,
  canIncrease: PropTypes.bool.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
}

export default Weapon