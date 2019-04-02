import { Form, Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import GeneralSettings from '../containers/GeneralSettings';
import DisplayShip from '../containers/DisplayShip';
import HullTypes from '../components/HullTypes';

class App extends Component {
  render() {
    return (
      <Row className="row justify-content-md-center">
        <Col sm="auto">
          <Container>
            <Form>
              <GeneralSettings />
              <HullTypes />
              <DisplayShip />
            </Form>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default App