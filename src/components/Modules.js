import React, { Component } from 'react';
import { Table, Row, Col, Input } from 'reactstrap';
import formatCost from '../utils/formatCost';
import HullTypes from './HullTypes'

const moduleData = require('../utils/module_data.json');

class Modules extends Component {
  constructor() {
    super();
    this.moduleSelector = this.moduleSelector.bind(this);
    this.reminingPoints = this.reminingPoints.bind(this);
    this.hasMounted = false;
  }

  state = {
    modules: []
  }

  moduleSelector(event, index) {
    let value = parseInt(event.currentTarget.value);

    if (!Modules.hullSupportsModifier(moduleData[index].class, this.props.hullClass) ||
        !this.reminingPoints(moduleData[index])) {
      console.log("Couldn't add the module")
      event.currentTarget.value = value > 0 ? value - 1 : 0;
      return;
    }

    let modules = this.state.modules.slice();

    // If something was just set to 0, delete it from the list
    if (value === 0) {
      modules = modules.filter(module => module.index !== index);
    }
    else {
      // If it already is in the list of selected modules, change it.
      let found = false;
      modules.forEach((module) => {
        if (module.index === index) {
          found = true;
          module.count = value;
        }
      });

      // If it's not in the list, add it
      if (found === false) {
        modules.push({index: index, count: value});
      }
    }

    const newState = Object.assign({}, this.state, {modules: modules});
    this.setState(newState);

    let parentModules = [];
    modules.forEach(module => {
      let data = moduleData[module.index];
      data.count = module.count;
      parentModules.push(data);
    });
    this.props.Update({
      modules: parentModules
    });
  }

  // Some modules cost more money the bigger the ship.
  static moduleCostModifier(hullClass, modified, cost) {
    if (modified) {
      if (hullClass === "Frigate") {
        return cost*10;
      }
      else if (hullClass === "Cruiser") {
        return cost*25;
      }
      else if (hullClass === "Capital") {
        return cost*100;
      }
    }
    return cost
  }

  // Some modules increase the power consumption on bigger ships.
  static powerMassCostModifier(hullClass, modified, cost) {
    if (modified) {
      if (hullClass === "Frigate") {
        return Math.ceil(cost*2);
      }
      else if (hullClass === "Cruiser") {
        return Math.ceil(cost*3);
      }
      else if (hullClass === "Capital") {
        return Math.ceil(cost*4);
      }
    }
    return cost
  }

  static hullSupportsModifier(modifierHull, shipHull) {
    return HullTypes.getHullValue(modifierHull) <= HullTypes.getHullValue(shipHull);
  }

  reminingPoints(module) {
    let modulePowerCost = Modules.powerMassCostModifier(this.props.hullClass, module.powerModifier, module.power);
    let moduleMassCost = Modules.powerMassCostModifier(this.props.hullClass, module.massModifier, module.mass);
    let currentStats = this.props.ShipStats.currentStats;
    if (currentStats.power - modulePowerCost < 0) { return false; }
    else if (currentStats.mass - moduleMassCost < 0) { return false; }
    return true;
  }

  componentDidMount() {
    this.hasMounted = true;
  }

  render() {
    let rows = [];
    moduleData.forEach((element, index) => {
      rows.push(
        <tr key={index}>
          <td>{element.shipFitting}</td>
          <td>{formatCost(Modules.moduleCostModifier(this.props.hullClass, element.costModifier, element.cost * this.props.modifier))}</td>
          <td>{Modules.powerMassCostModifier(this.props.hullClass, element.powerModifier, element.power)}</td>
          <td>{Modules.powerMassCostModifier(this.props.hullClass, element.massModifier, element.mass)}</td>
          <td>{element.class}</td>
          <td>{element.description}</td>
          <td><Input bsSize="sm" type="number" defaultValue={this.hasMounted ? undefined : "0"} step="1" min="0" max="99" 
              onInput={(e) => {this.moduleSelector(e, index)}} /></td>
          {/* <td><NumericInput min={0} max={99} value="0" /></td> */}
        </tr>
      )
    });

    return(
      <div>
        <Row>
          <Col sm="auto">
            <h3>Modules</h3>
          </Col>
        </Row>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>Ship Fitting</th>
              <th>Cost</th>
              <th>Power</th>
              <th>Mass</th>
              <th>Class</th>
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

export default Modules