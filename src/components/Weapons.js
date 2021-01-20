import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Weapon from '../containers/Weapon';

class Weapons extends Component {
  render() {
    let rows = [];
    this.props.weapons.forEach((element, index) => {
      rows.push(
        <Weapon key={index}
          data={element}
        />
      );
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
              <th style={{width: "22.32%"}}>Ship Weapon</th>
              <th style={{width: "11.01%"}}>Cost</th>
              <th style={{width: "9.17%"}}>Dmg</th>
              <th style={{width: "7.3%"}}>Power</th>
              <th style={{width: "6.15%"}}>Mass</th>
              <th style={{width: "6.92%"}}>Hard.</th>
              <th style={{width: "3.27%"}}>TL</th>
              <th style={{width: "22.13%"}}>qualities</th>
              <th style={{width: "12.33%"}}></th>
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
  hullClass: PropTypes.string,
  modifier: PropTypes.number.isRequired,
  weapons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      damage: PropTypes.string.isRequired,
      power: PropTypes.number.isRequired,
      mass: PropTypes.number.isRequired,
      hardpoints: PropTypes.number.isRequired,
      minClass: PropTypes.string.isRequired,
      techLevel: PropTypes.number.isRequired,
      qualities: PropTypes.shape({
        type: PropTypes.arrayOf(PropTypes.string.isRequired),
        ap: PropTypes.number,
        ammo: PropTypes.number,
        ammoCost: PropTypes.number,
      }).isRequired,
    })
  ).isRequired,
}

export default Weapons