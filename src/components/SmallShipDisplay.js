import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';

class SmallShipDisplay extends Component {
  render() {
    let hull = this.props.hull;
    let stats = this.props.stats;
    let modules = [];
    for (const [key, module] of Object.entries(this.props.modules)) {
      modules.push(
        <Row key={key}>
          <Col>{key} {module.count > 1 ? `x${module.count}` : null}</Col>
        </Row>
      );
    };

    let weapons = [];
    for (const [key, weapon] of Object.entries(this.props.weapons)) {
      weapons.push(
        <Row key={key}>
          <Col>{key} x{weapon.count > 1 ? `x${weapon.count}` : null}</Col>
        </Row>
      );
    };

    let defenses = [];
    for (const [key, defense] of Object.entries(this.props.defenses)) {
      defenses.push(
        <Row key={key}>
          <Col>{key} {defense.count > 1 ? `x${defense.count}` : null}</Col>
        </Row>
      )
    }

    return (
      <Row className="justify-content-md-center">
        <Col sm={5}>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th colSpan="4">{hull.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{textAlign: "right"}} sm={2}>HP:</td>
                <td sm={4}>{stats.hp || 0}</td>
                <td style={{textAlign: "right"}} sm={3}>Power:</td>
                <td sm={3}>{hull.power}/{stats.power} free</td>
              </tr>
              <tr>
                <td style={{textAlign: "right"}} sm={2}>AC:</td>
                <td sm={4}>{stats.ac}</td>
                <td style={{textAlign: "right"}} sm={3}>Mass:</td>
                <td sm={3}>{hull.mass}/{stats.mass} free</td>
              </tr>
              <tr>
                <td style={{textAlign: "right"}} sm={2}>Armor:</td>
                <td sm={4}>{stats.armor}</td>
                <td style={{textAlign: "right"}} sm={3}>Crew:</td>
                <td sm={3}>{hull.minCrew}/{hull.maxCrew}</td>
              </tr>
              <tr>
                <td style={{textAlign: "right"}} sm={2}>Speed:</td>
                <td sm={4}>{stats.speed}</td>
                <td style={{textAlign: "right"}} sm={3}>Hull Class:</td>
                <td sm={3}>{hull.class}</td>
              </tr>
              <tr>
                <td style={{textAlign: "right", verticalAlign: "middle"}} sm={2}>Fittings:</td>
                <td sm={10} colSpan="3">
                  {modules}
                </td>
              </tr>
              <tr>
                <td style={{textAlign: "right", verticalAlign: "middle"}} sm={2}>Weapons:</td>
                <td sm={10} colSpan="3">
                  {weapons}
                </td>
              </tr>
              <tr>
                <td style={{textAlign: "right", verticalAlign: "middle"}} sm={2}>Defenses:</td>
                <td sm={10} colSpan="3">
                  {defenses}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

SmallShipDisplay.propTypes = {
  hull: PropTypes.object,
  modules: PropTypes.object,
  weapons: PropTypes.object,
  stats: PropTypes.object,
};

export default SmallShipDisplay;