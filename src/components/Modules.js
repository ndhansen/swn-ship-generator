import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import HullTypes from './HullTypes'
import Module from '../containers/Module';

const moduleData = require('../utils/module_data.json');

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

  static hullSupportsModifier(modifierHull, shipHull) {
    return HullTypes.getHullValue(modifierHull) <= HullTypes.getHullValue(shipHull);
  }

  render() {
    let rows = [];
    moduleData.forEach((element, index) => {
      if (element.extra && (HullTypes.getHullValue(element.extra.maxClass) < HullTypes.getHullValue(this.props.hullClass))) {
        // This module won't work on a too big ship
        return;
      }
      if (Modules.hullSupportsModifier(element.class, this.props.hullClass)) {
        rows.push(
          <Module key={index}
            name={element.shipFitting}
            hullClass={element.class}
            cost={Modules.moduleCostModifier(this.props.hullClass, element.costModifier, element.cost * this.props.modifier)}
            mass={Modules.powerMassCostModifier(this.props.hullClass, element.massModifier, element.mass)}
            power={Modules.powerMassCostModifier(this.props.hullClass, element.powerModifier, element.power)}
            description={element.description}
            extra={element.extra}
          />
        );
      }
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
              <th>Ship Fitting</th>
              <th>Cost</th>
              <th>Power</th>
              <th>Mass</th>
              <th>Description</th>
              <th className="col-1"></th>
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
  hullClass: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired
}

export default Modules