import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Module from '../containers/Module';

class Modules extends Component {
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
    let rows = [];
    this.props.modules.forEach((element, index) => {
      rows.push(
        <Module key={index}
          data={element}
        />
      );
    });

    return(
      <div>
        <Row>
          <Col sm="auto">
            <h3>Modules</h3>
          </Col>
        </Row>
        <Table className="centerTable" striped size="sm">
          <thead>
            <tr>
              <th style={{width: "26.32%"}}>Ship Fitting</th>
              <th style={{width: "6.33%"}}>Cost</th>
              <th style={{width: "7.55%"}}>Power</th>
              <th style={{width: "6.48%"}}>Mass</th>
              <th style={{width: "44.91%"}}>Description</th>
              <th style={{width: "8.33%"}}></th>
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

Modules.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      power: PropTypes.number.isRequired,
      mass: PropTypes.number.isRequired,
      minClass: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      extra: PropTypes.shape({
        max: PropTypes.number,
        maxClass: PropTypes.string,
      }),
    }).isRequired
  ).isRequired,
}

export default Modules