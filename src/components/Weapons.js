import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Weapon from '../containers/Weapon';
import Modules from './Modules';

const weaponData = require('../utils/weapons.json');

class Weapons extends Component {
  render() {
    let rows = [];
    weaponData.forEach((element, index) => {
      if (Modules.hullSupportsModifier(element.minClass, this.props.hullClass)) {
        rows.push(
          <Weapon key={index}
            name={element.name}
            hullClass={element.minClass}
            cost={element.cost * this.props.modifier}
            mass={element.mass}
            power={element.power}
            hardpoints={element.hardpoints}
            damage={element.damage}
            qualities={element.qualities}
            techLevel={element.techLevel}
          />
        );
      }
    });

    return(
      <div>
        <Row>
          <Col sm="auto">
            <h3>Weapons</h3>
          </Col>
        </Row>
        <Table className="centerTable" striped size="sm">
          <thead>
            <tr>
              <th>Ship Weapon</th>
              <th>Cost</th>
              <th>Dmg</th>
              <th>Power</th>
              <th>Mass</th>
              <th>Hard.</th>
              <th>TL</th>
              <th>qualities</th>
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

Weapons.propTypes = {
  hullClass: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired
}

export default Weapons