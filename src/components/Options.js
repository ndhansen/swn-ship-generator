import { Component } from "react";
import { Button, Row, Col } from "reactstrap";

class Options extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="auto">
            <Button
              color="primary"
              onClick={() => this.props.onExport()} 
            >
              Export
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              color="primary"
              onClick={() => this.props.onImport(this.props.data)} 
            >
              Import
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Options
