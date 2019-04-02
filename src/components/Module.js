import React, { Component } from 'react';
import formatCost from '../utils/formatCost';

class Module extends Component {
  constructor(props) {
    super();
    this.index = props.index;
    this.name = props.name;
    this.costIsModified = props.costIsModified;
    this.powerIsModified = props.powerIsModified;
    this.massIsModified = props.massIsModified;
    this.hullClass = props.hullClass;

    this.cost = moduleCostModifier(props.hullClass, this.costIsModified, props.cost);
    this.power = powerMassCostModifier(props.hullClass, this.powerIsModified, props.power);
    this.mass = powerMassCostModifier(props.hullClass, this.massIsModified, props.mass);
    this.description = props.description;
  }

  // Some modules cost more money the bigger the ship.
  static moduleCostModifier(hullClass, modified, cost) {
    if (modified) {
      if (hullClass === "Frigate") {
        return cost*10;
      }
      else if (hullClass === "Cruiser") {
        return cost*25;
      }
      else if (hullClass === "Capital") {
        return cost*100;
      }
    }
    return cost
  }

  // Some modules increase the power consumption on bigger ships.
  static powerMassCostModifier(hullClass, modified, cost) {
    if (modified) {
      if (hullClass === "Frigate") {
        return Math.ceil(cost*2);
      }
      else if (hullClass === "Cruiser") {
        return Math.ceil(cost*3);
      }
      else if (hullClass === "Capital") {
        return Math.ceil(cost*4);
      }
    }
    return cost
  }

  render() {
    return (
      <tr>
        <td>{this.name}</td>
        <td>{formatCost(this.cost)}</td>
        <td>{this.power}</td>
        <td>{this.mass}</td>
        <td>{this.hullClass}</td>
        <td>{this.description}</td>
        <td><Input bsSize="sm" type="number" defaultValue="0" step="1" min="0" max="99" 
            onChange={(e) => {this.props.moduleSelector(e, index, this)}} /></td>
      </tr>
    )
  }
}

export default Module