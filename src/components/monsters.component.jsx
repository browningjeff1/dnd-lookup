import React, { Component } from 'react';

import '../css/monsters.css'


export default class Monsters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      size: '',
      type: '',
      subtype: '',
      alignment: '',
      armor_class: Number,
      hit_points: Number,
      hit_dice: '',
      walk_speed: '',
      fly_speed: '',
      swim_speed: '',
      strength: Number,
      dexterity: Number,
      constitution: Number,
      intelligence: Number,
      wisdom: Number,
      charisma: Number,
      proficiencies: [],
      damage_vulnerabilities: [],
      damage_resistances: [],
      damage_immunities: [],
      condition_immunities: [],
      senses: [],
      languages: '',
      challange_rating: Number,
      special_abilities: [],
      actions: [],
      legendary_actions: [],
      url: this.props.url,
    }
  }

  componentDidMount() {
    fetch('https://www.dnd5eapi.co' + this.state.url)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let name = data.name;
        let size = data.size;
        let type = data.type;
        let subtype = data.subtype;
        let alignment = data.alignment;
        let armor_class = data.armor_class;
        let hit_points = data.hit_points;
        let hit_dice = data.hit_dice;
        let walk_speed = data.speed.walk ? data.speed.walk : 'N/A';
        let fly_speed = data.speed.fly ? data.speed.fly : 'N/A';
        let swim_speed = data.speed.swim ? data.speed.swim : 'N/A';
        let strength = data.strength;
        let dexterity = data.dexterity;
        let constitution = data.constitution;
        let intelligence = data.intelligence;
        let wisdom = data.wisdom;
        let charisma = data.charisma;
        let proficiencies = data.proficiencies.map((e) => {
          return (
            <div>
              <div>{ e.name }</div>
              <div>Value: { e.value }</div>
            </div>
          )
        })
        let damage_vulnerabilities = data.damage_vulnerabilities.map((e) => {
          return (
            <div>{ e }</div>
          )
        })
        let damage_resistances = data.damage_resistances.map((e) => {
          return (
            <div>{ e }</div>
          )
        })
        let damage_immunities = data.damage_immunities.map((e) => {
          return (
            <div>{ this.capitalizeFLetter(e) }</div>
          )
        })
        let condition_immunities = data.condition_immunities.map((e) => {
          return (
            <div>{ this.capitalizeFLetter(e) }</div>
          )
        })
        let map_senses = new Map(Object.entries(data.senses));
        let arr_senses = Array.from(map_senses);
        let fixed_arr = this.loopNestArr(arr_senses);
        let senses = fixed_arr.map((el) => {
          return(            
            <li>{ this.capitalizeFLetter(el.join(': ')) }</li>
          )
        })
        

        

        this.setState({
          name: name,
          size: size,
          type: type,
          subtype: subtype,
          alignment: alignment,
          armor_class: armor_class,
          hit_points: hit_points,
          hit_dice: hit_dice,
          walk_speed: walk_speed,
          fly_speed: fly_speed,
          swim_speed: swim_speed,
          strength: strength,
          dexterity: dexterity,
          constitution: constitution,
          intelligence: intelligence,
          wisdom: wisdom,
          charisma: charisma,
          proficiencies: proficiencies,
          damage_vulnerabilities: damage_vulnerabilities,
          damage_resistances: damage_resistances,
          damage_immunities: damage_immunities,
          condition_immunities: condition_immunities,
          senses: senses,
        })
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }

  loopNestArr = (array) => {
    let arr = array   
    let arr_length = arr.length
    for (let i = 0; i < arr_length; i++) {
      let el = arr[i];
      let el_length = el.length;
      for (let j = 0; j < el_length; j++) {
        let item = el.shift();
        let thing = item.replace('_', ' ');
        let word = this.capitalizeFLetter(thing)
        el.splice(0, 0, word)
      }
    }
    return arr
  }

  capitalizeFLetter = (s) => {
    var splitStr = s.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 

    
  }

  render() {
    return (
      <div>
        <div className="name-container">{ this.state.name }</div>
        <div><strong>Size: </strong>{ this.state.size }</div>
        <div id="type" ><strong>Type: </strong>{ this.capitalizeFLetter(this.state.type) }</div>
        <div><strong>Subtype: </strong>{ this.capitalizeFLetter(this.state.subtype) }</div>
        <div><strong>Alignment: </strong>{ this.capitalizeFLetter(this.state.alignment) }</div>
        <div><strong>Armor Class: </strong>{ this.state.armor_class.toString() }</div>
        <div><strong>Hit Points: </strong>{ this.state.hit_points.toString() }</div>
        <div><strong>Hit Dice: </strong>{ this.state.hit_dice }</div>
        <div>
          <ul className="speed-container">
            <li>Walking Speed: { this.state.walk_speed }</li>
            <li>Flying Speed: { this.state.fly_speed }</li>
            <li>Swimming Speed: { this.state.swim_speed }</li>
          </ul>
        </div>
        <div><strong>Strength: </strong>{ this.state.strength.toString() }</div>
        <div><strong>Dexterity: </strong>{ this.state.dexterity.toString() }</div>
        <div><strong>Constitution: </strong>{ this.state.constitution.toString() }</div>
        <div><strong>Intelligence: </strong>{ this.state.intelligence.toString() }</div>
        <div><strong>Wisdom: </strong>{ this.state.wisdom.toString() }</div>
        <div><strong>Charisma:</strong>{ this.state.charisma.toString() }</div>
        <div><strong>Proficiencies: </strong>{ this.state.proficiencies }</div>
        <div><strong>Damage Vulnerabilities: </strong>{ this.state.damage_vulnerabilities }</div>
        <div><strong>Damage Resistances: </strong>{ this.state.damage_resistances }</div>
        <div><strong>Damage Immunities: </strong>{ this.state.damage_immunities }</div>
        <div><strong>Condition Immunities: </strong>{ this.state.condition_immunities }</div>
        <div><strong>Senses:</strong>
          <ul>
            { this.state.senses }
          </ul>
        </div>
      </div>
    )
  }
}