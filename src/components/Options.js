import { Component } from "react";
import { Button, Row, Col, Input } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
import PropTypes from 'prop-types';
import "react-confirm-alert/src/react-confirm-alert.css";

class Options extends Component {
  clear = () => {
    confirmAlert({
      title: "Confirm to clear",
      message: "This will reset the entire page.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.clearAll(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  export = () => {
    const exportState = this.props.state;
    delete exportState["_persist"];
    const exportString =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportState));

    const dlAnchorElem = document.getElementById("downloadAnchorElement");
    dlAnchorElem.setAttribute("href", exportString);
    dlAnchorElem.setAttribute("download", this.props.state.name + "_ship.json");
    dlAnchorElem.click();
  };

  triggerImport = () => {
    const uploadAnchorElement = document.getElementById("uploadAnchorElement");
    uploadAnchorElement.click();
  }

  importData = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const data = JSON.parse(content);
      this.props.onImport(data);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs="auto">
            <Button color="primary" onClick={this.export}>
              Export
            </Button>
            <a href="." id="downloadAnchorElement" style={{display: "none"}}>
              Hidden download button
            </a>
          </Col>
          <Col xs="auto">
            <Button
              color="primary"
              onClick={this.triggerImport}
            >
              Import
            </Button>
            <Input
              type="file"
              id="uploadAnchorElement"
              style={{display: "none"}}
              onChange={this.importData}
            />
          </Col>
          <Col xs="auto">
            <Button color="primary" onClick={this.clear}>
              Clear
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Options;

Options.propType = {
  state: PropTypes.object.isRequired,
  onExport: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
}