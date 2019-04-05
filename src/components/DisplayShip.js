import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';

class DisplayShip extends Component {
  render() {
    let stats = this.props.shipStats;
    // let modules = [];
    // this.props.ShipStats.modules.forEach((module, index) => {
    //   modules.push(
    //     <Row key={index}>
    //       <Col>{module.shipFitting}</Col>
    //     </Row>
    //   );
    // });

    return (
      <Row className="justify-content-md-center">
        <Col sm={5}>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th colSpan="4">{stats.hullType}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{textAlign: "right"}} sm={2}>HP:</td>
                <td sm={4}>{stats.hp}</td>
                <td style={{textAlign: "right"}} sm={3}>Power:</td>
                <td sm={3}>{stats.power}</td>
              </tr>
              <tr>
                <td style={{textAlign: "right"}} sm={2}>AC:</td>
                <td sm={4}>{stats.ac}</td>
                <td style={{textAlign: "right"}} sm={3}>Mass:</td>
                <td sm={3}>{stats.mass}</td>
              </tr>
              <tr>
                <td style={{textAlign: "right"}} sm={2}>Armor:</td>
                <td sm={4}>{stats.armor}</td>
                <td style={{textAlign: "right"}} sm={3}>Crew:</td>
                <td sm={3}>{stats.minCrew}/{stats.maxCrew}</td>
              </tr>
              <tr>
                <td style={{textAlign: "right"}} sm={2}>Speed:</td>
                <td sm={4}>{stats.speed}</td>
                <td style={{textAlign: "right"}} sm={3}>Hull Class:</td>
                <td sm={3}>{stats.class}</td>
              </tr>
              <tr>
                <td style={{textAlign: "right", verticalAlign: "middle"}} sm={2}>Fittings:</td>
                <td sm={10} colSpan="3">
                  {/* {modules} */}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

DisplayShip.propTypes = {
  shipStats: PropTypes.object.isRequired
};

export default DisplayShip;