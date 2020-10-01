import React, { Component } from 'react'

export default class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      equipment_category: '',
      weapon_category: '',
      weapon_range: '',
      category_range: '',
      gear_category: '',
      vehicle_category: '',
      cost: '',
      damage: [],
      range: [],
      weight: '',
      desc: [],
      properties: [],
      url: this.props.url
    }
  }

  componentDidMount() {
    fetch('https://www.dnd5eapi.co' + this.state.url)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let name = data.name;
        let equipment_category = data.equipment_category.name ? data.equipment_category.name : data.equipment_category;
        let weapon_category = data.weapon_category;
        let weapon_range = data.weapon_range;
        let category_range = data.category_range;
        let gear_category = data.gear_category;
        let vehicle_category = data.vehicle_category;
        let cost = data.cost.quantity.toString() + ' ' + data.cost.unit;
        let damage = [];
        data.damage ? damage.push(<div>
          <div>{ data.damage.damage_dice }</div>
          <div>{ data.damage.damage_bonus ? data.damage.damage_bonus.toString() : data.damage.damage_bonus }</div>
          <div>{ data.damage.damage_type.name }</div>
        </div>) : damage = [];
        let weight = data.weight.toString();
        let desc = data.desc;

        this.setState({
          name: name,
          equipment_category: equipment_category,
          weapon_category: weapon_category,
          weapon_range: weapon_range,
          category_range: category_range,
          gear_category: gear_category,
          vehicle_category: vehicle_category,
          cost: cost,
          damage: damage,
          weight: weight,
          desc: desc,
        })
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }

  render() {
    return(
      <div className="equipmentContainer">
        <strong>{ this.state.name }</strong>
        <div>{ this.state.equipment_category }</div>
        <div>{ this.state.gear_category }</div>
        <div>{ this.state.weapon_category }</div>
        <div>{ this.state.weapon_range }</div>
        <div>{ this.state.category_range }</div>
        <div>{ this.state.vehicle_category }</div>
        <div>{ this.state.cost }</div>
        <div>{ this.state.damage }</div>
        <div>{ this.state.weight }</div>
        <div>{ this.state.desc }</div>
      </div>
    )
  }
}