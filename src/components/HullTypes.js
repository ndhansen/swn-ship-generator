import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import HullType from '../containers/HullType';

class HullTypes extends Component {
  static getHullValue (hullClass) {
    if (hullClass === "Fighter") { return 0; }
    else if (hullClass === "Frigate") { return 1; }
    else if (hullClass === "Cruiser") { return 2; }
    else if (hullClass === "Capital") { return 3; }
  }

  render() {
    let rows = [];
    this.props.hulls.forEach((element, index) => {
      rows.push(
        <HullType key={index}
          data={element}
        />
      )
    });

    return (
      <div>
        <Row>
          <Col sm="auto">
            <h3>Ship types</h3>
          </Col>
        </Row>
        <Table className="centerTable" striped size="sm">
          <thead>
            <tr>
              <th>Hull Type</th>
              <th>Cost</th>
              <th>Speed</th>
              <th>Armor</th>
              <th>HP</th>
              <th>Crew</th>
              <th>AC</th>
              <th>Power</th>
              <th>Mass</th>
              <th>Hard.</th>
              <th>Class</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default HullTypes;