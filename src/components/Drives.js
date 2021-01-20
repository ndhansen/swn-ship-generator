import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Drive from '../containers/Drive';

class Drives extends Component {
  render() {
    let rows = [];
    if (this.props.speed !== null) {
        // We don't want to show drives for space stations
        this.props.drives.forEach((element, index) => {
          rows.push(
            <Drive
              key={index}
              data={element}
            />
          );
        });
    }

    return(
      <div>
        <Row>
          <Col sm="auto">
            <h3>Drives</h3>
          </Col>
        </Row>
        <Table className="centerTable" striped size="sm">
          <thead>
            <tr>
              <th style={{width: "21.03%"}}>Ship Drive</th>
              <th style={{width: "9.68%"}}>Cost</th>
              <th style={{width: "11.47%"}}>Power</th>
              <th style={{width: "9.88%"}}>Mass</th>
              <th style={{width: "39.56%"}}>Description</th>
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

Drives.propTypes = {
  hullClass: PropTypes.string,
  modifier: PropTypes.number.isRequired,
  speed: PropTypes.number,
  drives: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      power: PropTypes.number.isRequired,
      mass: PropTypes.number.isRequired,
      minClass: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default Drives