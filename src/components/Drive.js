import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import formatCost from '../utils/formatCost';

class Drive extends Component {
  constructor() {
    super();
    this.selectDrive = this.selectDrive.bind(this);
  }

  selectDrive() {
    if (!this.props.active) {
      let data = {
        name: this.props.name,
        cost: this.props.cost,
        power: this.props.power,
        mass: this.props.mass,
        description: this.props.description
      };
      this.props.onSelect(data);
    } else {
      this.props.onDeselect();
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{formatCost(this.props.cost)}</td>
        <td>{this.props.power}</td>
        <td>{this.props.mass}</td>
        <td>{this.props.description}</td>
        <td>
          <Button
            outline
            color="success"
            size="sm"
            onClick={() => this.selectDrive()}
            active={this.props.active}
            style={{width: "100%"}}>
            Select
          </Button>
        </td>
      </tr>
    )
  }
}

Drive.propTypes = {
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  mass: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
}

export default Drive