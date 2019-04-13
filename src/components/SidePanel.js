import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

class SidePanel extends Component {
  render() {
    return (
      <div className="sticky">
        <Table bordered className="side-table" size="sm">
          <thead>
            <tr>
              <th colSpan="2">Remaining points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign: "right"}} sm={8}>Hulltype:</td>
              <td sm={4}>{this.props.hullType}</td>
            </tr>
            <tr>
              <td style={{textAlign: "right"}} sm={8}>Mass:</td>
              <td sm={4}>{this.props.mass}</td>
            </tr>
            <tr>
              <td style={{textAlign: "right"}} sm={8}>Power:</td>
              <td sm={4}>{this.props.power}</td>
            </tr>
            <tr>
              <td style={{textAlign: "right"}} sm={8}>Hardpoints:</td>
              <td sm={4}>{this.props.hardpoints}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

SidePanel.propType = {
  hullType: PropTypes.string.isRequired,
  mass: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  hardpoints: PropTypes.number.isRequired
}

export default SidePanel