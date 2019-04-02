import React, { Component } from 'react';
import { Label, FormGroup, Col, Row } from 'reactstrap';
import { CostModifiers } from '../actions';
import PropTypes from 'prop-types';

class GeneralSettings extends Component {
  render() {
    return(
      <div>
        <Row>
          <Col sm="auto">
            <h3>General Settings</h3>
          </Col>
        </Row>
        <FormGroup row>
          <Label sm={2} for="costModifier">Ship scarcity</Label>
          <Col sm="auto">
            <select className="form-control" id="costModifier" ref="costModifier" name="cost modifier" onChange={() => this.props.onChange(this.refs.costModifier.value)}>
              <option value={CostModifiers.UNCOMMON}>Uncommon</option>
              <option value={CostModifiers.COMMON}>Common</option>
              <option value={CostModifiers.FREQUENT}>Frequent</option>
            </select>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

GeneralSettings.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default GeneralSettings;