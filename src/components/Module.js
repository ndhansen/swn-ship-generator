import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import formatCost from '../utils/formatCost';

class Module extends Component {
  constructor() {
    super();
    this.moduleChanged = this.moduleChanged.bind(this);
    this.toggleModule = this.toggleModule.bind(this);
  }

  moduleChanged(count) {
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

  toggleModule(active) {
    if (active) {
      this.moduleChanged(0);
    } else {
      this.moduleChanged(1);
    }
  }

  render() {
    let input
    if (this.props.extra && this.props.extra.max === 1) {
      let active = this.props.value > 0
      input =
        <Button
            outline 
            color="success" 
            size="sm" 
            onClick={() => this.toggleModule(active)} 
            active={active}
            style={{width: "100%"}}>
          Select
        </Button>
    } else {
      input = <Input bsSize="sm" type="number" value={this.props.value} step="1" min="0" max="99" 
          onChange={(e) => {this.moduleChanged(parseInt(e.currentTarget.value))}} />
    }
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{formatCost(this.props.cost)}</td>
        <td>{this.props.power}</td>
        <td>{this.props.mass}</td>
        <td>{this.props.description}</td>
        <td>{input}</td>
      </tr>
    )
  }
}

Module.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  mass: PropTypes.number.isRequired,
  hullClass: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  extra: PropTypes.object,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
}

export default Module