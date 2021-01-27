import React, { Component } from "react";
import { Col, Row, Table } from "reactstrap";
import Ammo from "../containers/Ammo";
import HullTypes from "./HullTypes";

class Ammos extends Component {
  static ammoCountDifference(hullClass, ammoClass) {
    return (
      HullTypes.getHullValue(hullClass) - HullTypes.getHullValue(ammoClass)
    );
  }

  render() {
    let rows = [];
    this.props.ammos.forEach((element, index) => {
      rows.push(
        <Ammo key={index}
          data={element}
        />
      );
    });

    return(
      <div>
        <Row>
          <Col sm="auto">
            <h3>Ammo</h3>
          </Col>
        </Row>
        <Table className="centerTable" striped size="sm">
          <thead>
            <tr>
              <th>Weapon name</th>
              <th>Cost</th>
              <th>Shots</th>
              <th>Cost / shot</th>
              <th>Mass</th>
              <th>Dmg</th>
              <th style={{width: "10.0%"}}></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Ammos;
