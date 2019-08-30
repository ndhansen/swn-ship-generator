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
              <th style={{width: "26.32%"}}>Ship Weapon</th>
              <th style={{width: "7.01%"}}>Cost</th>
              <th style={{width: "9.17%"}}>Dmg</th>
              <th style={{width: "8.3%"}}>Power</th>
              <th style={{width: "7.15%"}}>Mass</th>
              <th style={{width: "7.92%"}}>Hard.</th>
              <th style={{width: "4.27%"}}>TL</th>
              <th style={{width: "22.13%"}}>qualities</th>
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

Weapons.propTypes = {
  hullClass: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired
}

export default Weapons