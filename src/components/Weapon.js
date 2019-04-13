import React, { Component } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import formatCost from '../utils/formatCost';

class Weapon extends Component {
  constructor() {
    super();
    this.weaponChanged = this.weaponChanged.bind(this);
  }

  weaponChanged(count) {
    let data = {
      name: this.props.name,
      damage: this.props.damage,
      cost: this.props.cost,
      power: this.props.power,
      mass: this.props.mass,
      hardpoints: this.props.hardpoints,
      qualities: this.props.qualities
    };
    if (count > this.props.value) {
      this.props.onIncrease(data);
    } else if (count < this.props.value) {
      this.props.onDecrease(data);
    }
  }

  render() {
    let input = <Input bsSize="sm" type="number" value={this.props.value} step="1" min="0" max="99" 
        onChange={(e) => {this.weaponChanged(parseInt(e.currentTarget.value))}} />

    let qualities = "";
    let length = this.props.qualities.type.length;
    this.props.qualities.type.forEach((type, index) => {
      if (type === "ap") {
        qualities += `AP ${this.props.qualities.ap}`;
      }
      else if (type === "ammo") {
        qualities += `Ammo ${this.props.qualities.ammo}`;
      }
      else {
        qualities += type;
      }

      if (index !== length-1) {
        qualities += ", ";
      }
    });

    let cost = `${formatCost(this.props.cost)}`;
    if ("ammo" in this.props.qualities.type) {
      cost += `/${this.props.qualities.ammoCost}`;
    }

    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{cost}</td>
        <td>{this.props.damage}</td>
        <td>{this.props.power}</td>
        <td>{this.props.mass}</td>
        <td>{this.props.hardpoints}</td>
        <td>{this.props.techLevel}</td>
        <td>{qualities}</td>
        <td>{input}</td>
      </tr>
    )
  }
}

Weapon.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  damage: PropTypes.string.isRequired,
  power: PropTypes.number.isRequired,
  mass: PropTypes.number.isRequired,
  hardpoints: PropTypes.number.isRequired,
  techLevel: PropTypes.number.isRequired,
  qualities: PropTypes.object.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
}

export default Weapon