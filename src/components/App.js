import { Form, Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import '../utils/App.css'
import GeneralSettings from '../containers/GeneralSettings';
import DisplayShip from '../containers/DisplayShip';
import HullTypes from '../containers/HullTypes';
import Drives from '../containers/Drives';
import Modules from '../containers/Modules';
import Weapons from '../containers/Weapons';
import SidePanel from '../containers/SidePanel';
import Options from '../containers/Options';

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
              <DisplayShip />
            </Form>
          </Container>
        </Col>
        <Col sm="2">
          <Row className="sticky">
            <SidePanel />
            <Options />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default App