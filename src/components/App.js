import { Form, Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import '../utils/App.css'
import GeneralSettings from '../containers/GeneralSettings';
import DisplayShip from '../containers/DisplayShip';
import HullTypes from '../components/HullTypes';
import Modules from '../containers/Modules';
import Weapons from '../containers/Weapons';
import SidePanel from '../containers/SidePanel';

class App extends Component {
  render() {
    return (
      <Row className="row justify-content-md-center">
        <Col sm="auto">
          <Container>
            <Form>
              <GeneralSettings />
              <HullTypes />
              <Modules />
              <Weapons />
              <DisplayShip />
            </Form>
          </Container>
        </Col>
        <Col sm="2">
          <SidePanel />
        </Col>
      </Row>
    );
  }
}

export default App