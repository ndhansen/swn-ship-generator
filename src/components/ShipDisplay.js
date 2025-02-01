import React, { Component } from 'react';
import { Row, Col, Table, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import formatCost from '../utils/formatCost';

class ShipDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    const toggle = () => this.setState({ show: !this.state.show });

    const weapons = []
    for (const [name, weapon] of Object.entries(this.props.weapons)) {
      let qualities = "";
      let length = weapon.qualities.type.length;
      weapon.qualities.type.forEach((type, index) => {
        if (type === "ap") {
          qualities += `AP ${weapon.qualities.ap}`;
        }
        else if (type === "ammo") {
          qualities += `Ammo ${weapon.qualities.ammo}`;
        }
        else {
          qualities += type;
        }

        if (index !== length - 1) {
          qualities += ", ";
        }
      });

      let cost = `${formatCost(weapon.cost * weapon.count)}`;
      if (weapon.qualities.type.includes("ammo")) {
        cost += ` / ${formatCost(weapon.qualities.ammoCost)}`;
      }

      weapons.push(
        <tr key={name}>
          <td>{weapon.count}</td>
          <td>{weapon.name}</td>
          <td>{formatCost(cost)}</td>
          <td>{weapon.damage}</td>
          <td>{qualities}</td>
        </tr>
      );
    }

    const defenses = []
    for (const [name, defense] of Object.entries(this.props.defenses)) {
      let cost = `${formatCost(defense.cost)}`;
      if (
        defense?.qualities?.type &&
        defense?.qualities?.type.includes("ammo")
      ) {
        cost += ` / ${formatCost(defense.qualities.ammoCost * defense.count)}`;
      }

      defenses.push(
        <tr key={name}>
          <td>{defense.count}</td>
          <td>{defense.name}</td>
          <td>{cost}</td>
        </tr>
      );
    }

    const modules = []
    for (const [name, module] of Object.entries(this.props.modules)) {
      modules.push(
        <tr key={name}>
          <td>{module.count}</td>
          <td>{module.name}</td>
          <td>{formatCost(module.cost * module.count)}</td>
        </tr>
      )
    }

    const ammo = []
    for (const [name, ammoData] of Object.entries(this.props.ammo)) {
      ammo.push(
        <tr key={name}>
          <td>{ammoData.ammo * ammoData.count}</td>
          <td>{ammoData.name}</td>
          <td>{formatCost(ammoData.totalAmmoCost * ammoData.count)}</td>
        </tr>
      );
    }

    return (
      <div>
        <Button color="primary" onClick={toggle}>
          Show ship stats
        </Button>

        <Modal isOpen={this.state.show} toggle={toggle} size="lg" style={{ maxWidth: "1000px" }}>
          <ModalBody>
            <Row>
              <Col sm={6}>
                <Row className="non-padded-table">
                  <Table className="centerTable" bordered size="sm">
                    <tbody>
                      <tr>
                        <td>Ship Name</td>
                        <td>{this.props.name}</td>
                      </tr>
                      <tr>
                        <td>Hull Type</td>
                        <td>{this.props.hull.name}</td>
                      </tr>
                      <tr>
                        <td>Engine Type</td>
                        <td>{this.props.drive.name}</td>
                      </tr>
                      <tr>
                        <td>Class</td>
                        <td>{this.props.hull.class}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row className="non-padded-table">
                  <Table className="centerTable" bordered size="sm">
                    <tbody>
                      <tr>
                        <td>Cost</td>
                        <td>{formatCost(this.props.stats.cost)}</td>
                      </tr>
                      <tr>
                        <td>Maintenance</td>
                        <td>{formatCost(this.props.stats.cost / 20)} / 6mo</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row className="non-padded-table">
                  <Table className="centerTable" bordered size="sm">
                    <thead>
                      <tr>
                        <th>Stats</th>
                        <th>Hull</th>
                        <th>Actual</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>hardpoints</td>
                        <td>{this.props.rawHull?.hardpoints}</td>
                        <td>{this.props.stats.hardpoints}</td>
                      </tr>
                      <tr>
                        <td>Mass</td>
                        <td>{this.props.rawHull?.mass}</td>
                        <td>{this.props.stats.mass}</td>
                      </tr>
                      <tr>
                        <td>Power</td>
                        <td>{this.props.rawHull?.power}</td>
                        <td>{this.props.stats.power}</td>
                      </tr>
                      <tr>
                        <td>Armor Class</td>
                        <td>{this.props.rawHull?.ac}</td>
                        <td>{this.props.stats.ac}</td>
                      </tr>
                      <tr>
                        <td>Min. Crew</td>
                        <td>{this.props.rawHull?.minCrew}</td>
                        <td>{this.props.hull.minCrew}</td>
                      </tr>
                      <tr>
                        <td>Max Crew</td>
                        <td>{this.props.rawHull?.maxCrew}</td>
                        <td>{this.props.hull.maxCrew}</td>
                      </tr>
                      <tr>
                        <td>Hit Points</td>
                        <td>{this.props.rawHull?.hp}</td>
                        <td>{this.props.hull.hp}</td>
                      </tr>
                      <tr>
                        <td>Armor</td>
                        <td>{this.props.rawHull?.armor}</td>
                        <td>{this.props.hull.armor}</td>
                      </tr>
                      <tr>
                        <td>Speed</td>
                        <td>{this.props.rawHull?.speed}</td>
                        <td>{this.props.hull.speed}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row className="non-padded-table">
                  <Table className="centerTable" bordered size="sm">
                    <tbody>
                      <tr>
                        <td>Cargo Space</td>
                        <td>{this.props.cargo.cargoSpace}</td>
                      </tr>
                      <tr>
                        <td>Hidden Cargo</td>
                        <td>{this.props.cargo.hiddenCargoSpace}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              </Col>
              <Col sm={6}>
                <Row className="non-padded-table">
                  <Table className="centerTable" bordered size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Weapons</th>
                        <th>Cost</th>
                        <th>Dmg</th>
                        <th>Qualities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weapons}
                    </tbody>
                  </Table>
                </Row>
                <Row className="non-padded-table">
                  <Table className="centerTable" bordered size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Defenses</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {defenses}
                    </tbody>
                  </Table>
                </Row>
                <Row className="non-padded-table">
                  <Table className="centerTable" bordered size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Fittings</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modules}
                    </tbody>
                  </Table>
                </Row>
                <Row className="non-padded-table">
                  <Table className="centerTable" bordered size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Ammo</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ammo}
                    </tbody>
                  </Table>
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ShipDisplay

ShipDisplay.propTypes = {
  name: PropTypes.string,
  rawHull: PropTypes.object.isRequired,
  hull: PropTypes.object.isRequired,
  cargo: PropTypes.object.isRequired,
  drive: PropTypes.object.isRequired,
  modules: PropTypes.object.isRequired,
  weapons: PropTypes.object.isRequired,
  defenses: PropTypes.object.isRequired,
  ammo: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
}
