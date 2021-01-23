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
        name: this.props.data.name,
      };
      this.props.onSelect(data);
    } else {
      this.props.onDeselect();
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.data.name}</td>
        <td>{formatCost(this.props.data.cost)}</td>
        <td>{this.props.data.power}</td>
        <td>{this.props.data.mass}</td>
        <td>{this.props.data.description}</td>
        <td>
          <Button
            outline
            disabled={!this.props.active && !this.props.isSelectable}
            color="primary"
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
  isSelectable: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    minClass: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
}

export default Drive