import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Modules from '../components/Modules';
import Drive from '../containers/Drive';

const driveData = require('../utils/ship_drives.json');

class Drives extends Component {
  render() {
    let rows = [];
    if (this.props.speed !== null) {
        // We don't want to show drives for space stations
        driveData.forEach((element, index) => {
        if (Modules.hullSupportsModifier(element.minClass, this.props.hullClass)) {
            rows.push(
            <Drive key={index}
                name={element.name}
                cost={Modules.moduleCostModifier(this.props.hullClass, element.costModifier, element.cost * this.props.modifier)}
                mass={Modules.powerMassCostModifier(this.props.hullClass, element.massModifier, element.mass)}
                power={Modules.powerMassCostModifier(this.props.hullClass, element.powerModifier, element.power)}
                description={element.description}
            />
            );
        }
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
              <th>Ship Drive</th>
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

Drives.propTypes = {
  hullClass: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired,
  speed: PropTypes.number
}

export default Drives