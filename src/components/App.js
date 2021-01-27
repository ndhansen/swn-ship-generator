import { Form, Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import '../utils/App.css';
import GeneralSettings from '../containers/GeneralSettings';
import SmallShipDisplay from '../containers/SmallShipDisplay';
import HullTypes from '../containers/HullTypes';
import Drives from '../containers/Drives';
import Modules from '../containers/Modules';
import Weapons from '../containers/Weapons';
import SidePanel from '../containers/SidePanel';
import Options from '../containers/Options';
import Defenses from '../containers/Defenses';
import Ammos from '../containers/Ammos';
import ShipDisplay from '../containers/ShipDisplay';

class App extends Component {
  render() {
    return (
      <Row className="justify-content-md-center">
        <Col sm="auto">
          <Container fluid={true} style={{minWidth: "1000px"}} >
            <Form>
              <GeneralSettings />
              <HullTypes />
              <Drives />
              <Modules />
              <Weapons />
              <Defenses />
              <Ammos />
              <SmallShipDisplay />
            </Form>
          </Container>
        </Col>
        <Col sm="2">
          <Row className="sticky">
            <Col>
              <Row>
                <SidePanel />
              </Row>
              <Row style={{marginBottom: "1rem"}}>
                <Options />
              </Row>
              <Row style={{marginBottom: "1rem"}}>
                <ShipDisplay />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default App