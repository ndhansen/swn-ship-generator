import React, { Component } from 'react';
import { Table } from 'reactstrap';

class SidePanel extends Component {
  constructor() {
    super();
  }

  render() {
    let stats = this.props.ShipStats.currentStats;
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
              <td sm={4}>{this.props.ShipStats.baseShipStats.hullType}</td>
            </tr>
            <tr>
              <td style={{textAlign: "right"}} sm={8}>Mass:</td>
              <td sm={4}>{stats.mass}</td>
            </tr>
            <tr>
              <td style={{textAlign: "right"}} sm={8}>Power:</td>
              <td sm={4}>{stats.power}</td>
            </tr>
            <tr>
              <td style={{textAlign: "right"}} sm={8}>Hardpoints:</td>
              <td sm={4}>{stats.hardpoints}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default SidePanel