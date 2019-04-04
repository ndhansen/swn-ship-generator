import React, { Component } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import formatCost from '../utils/formatCost';

class Module extends Component {
  constructor() {
    super();
    this.moduleChanged = this.moduleChanged.bind(this);
  }

  moduleChanged(count) {
    console.log(count);
    let data = {
      name: this.props.name,
      cost: this.props.cost,
      power: this.props.power,
      mass: this.props.mass,
      description: this.props.description
    };
    if (count > this.props.value) {
      this.props.onIncrease(data);
    } else if (count < this.props.value) {
      this.props.onDecrease(data);
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{formatCost(this.props.cost)}</td>
        <td>{this.props.power}</td>
        <td>{this.props.mass}</td>
        <td>{this.props.hullClass}</td>
        <td>{this.props.description}</td>
        <td><Input bsSize="sm" type="number" value={this.props.value} step="1" min="0" max="99" 
            onChange={(e) => {this.moduleChanged(parseInt(e.currentTarget.value))}} /></td>
      </tr>
    )
  }
}

Module.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  mass: PropTypes.number.isRequired,
  hullClass: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
}

export default Module