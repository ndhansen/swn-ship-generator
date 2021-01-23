import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Defense from '../containers/Defense';

class Defenses extends Component {
  render() {
    let rows = [];
    this.props.defenses.forEach((element, index) => {
      rows.push(
        <Defense key={index}
          data={element}
        />
      );
    });

    return(
      <div>
        <Row>
          <Col sm="auto">
            <h3>Defenses</h3>
          </Col>
        </Row>
        <Table className="centerTable" striped size="sm">
          <thead>
            <tr>
              <th style={{width: "20.32%"}}>Ship Defense</th>
              <th style={{width: "11.01%"}}>Cost</th>
              <th style={{width: "6.3%"}}>Power</th>
              <th style={{width: "5.15%"}}>Mass</th>
              <th style={{width: "30.13%"}}>Effect</th>
              <th style={{width: "6.33%"}}></th>
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

Defenses.propTypes = {
  defenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      power: PropTypes.number.isRequired,
      mass: PropTypes.number.isRequired,
      minClass: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      extra: PropTypes.shape({
        max: PropTypes.number,
      }),
      qualities: PropTypes.shape({
        type: PropTypes.arrayOf(
          PropTypes.string.isRequired,
        ),
        ammo: PropTypes.number,
        ammoCost: PropTypes.number,
      }),
    })
  ).isRequired,
}

export default Defenses