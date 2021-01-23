import React, { Component } from "react";
import formatCost from '../utils/formatCost';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

class Ammo extends Component {
  constructor() {
    super();
    this.ammoChanged = this.ammoChanged.bind(this);
  }
  
  ammoChanged(count) {
    const data = {
      name: this.props.data.name,
    };
    if (count > this.props.value && this.props.canIncrease) {
      this.props.onIncrease(data);
    } else if (count >= 0) {
      this.props.onDecrease(data);
    }
  }

  render() {
    let cost = formatCost(this.props.data.qualities.totalAmmoCost);
    let costPerShot = formatCost(this.props.data.qualities.ammoCost);

    return (
      <tr>
        <td>{this.props.data.name}</td>
        <td>{cost}</td>
        <td>{this.props.data.qualities.ammo}</td>
        <td>{costPerShot}</td>
        <td>1</td>
        <td>{this.props.data.damage}</td>
        <td>
          <div>
            {this.props.value}
            <AddCircleIcon
              color={this.props.canIncrease ? "primary" : "disabled"}
              onClick={() => {this.ammoChanged(this.props.value + 1)}}
            />
            <RemoveCircleIcon
              color={this.props.value > 0 ? "primary" : "disabled"}
              onClick={() => {this.ammoChanged(this.props.value - 1)}}
            />
          </div>
        </td>
      </tr>
    );
  }
}

export default Ammo
