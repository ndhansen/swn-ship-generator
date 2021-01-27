import React, { Component } from 'react';
import { Button } from 'reactstrap';
import formatCost from '../utils/formatCost';
import PropTypes from 'prop-types';

class HullType extends Component {
  constructor() {
    super();
    this.setHull = this.setHull.bind(this);
  }

  setHull() {
    const data = {
      name: this.props.data.name,
    }
    this.props.onClick(data);
  }

  render() {
    return (
      <tr>
        <td>{this.props.data.name}</td>
        <td style={{textAlign: "right"}}>{formatCost(this.props.data.cost)}</td>
        <td>{this.props.data.speed}</td>
        <td>{this.props.data.armor}</td>
        <td>{this.props.data.hp}</td>
        <td>{this.props.data.minCrew} / {this.props.data.maxCrew}</td>
        <td>{this.props.data.ac}</td>
        <td>{this.props.data.power}</td>
        <td>{this.props.data.mass}</td>
        <td>{this.props.data.hardpoints}</td>
        <td>{this.props.data.class}</td>
        <td>
          <Button
              outline 
              disabled={!this.props.active && !this.props.isSelectable}
              color="primary" 
              size="sm" 
              onClick={() => this.props.onClick(this.props.data)} 
              active={this.props.active}>
            Select
          </Button>
        </td>
      </tr>
    );
  }
}

HullType.propType = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    modifier: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    armor: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
    minCrew: PropTypes.number.isRequired,
    maxCrew: PropTypes.number.isRequired,
    ac: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    hardpoints: PropTypes.number.isRequired,
  }).isRequired,
  isSelectable: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default HullType