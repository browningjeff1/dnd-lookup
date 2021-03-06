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
      challenge_rating: Number,
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
        let subtype = data.subtype ? data.subtype : 'None';
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
        let damage_vulnerabilities = data.damage_vulnerabilities.length ? <div><strong>Damage Vulnerabilities: </strong>
          {data.damage_vulnerabilities.map((e) => {
            return (
              <div>{ e }</div>
            )
          })}
        </div> : null;
        let damage_resistances = data.damage_resistances.length ? <div><strong>Damage Resistances: </strong>
          {data.damage_resistances.map((e) => {
            return (
              <div>{ e }</div>
            )
          })}
        </div> : null;
        let damage_immunities = data.damage_immunities.length ? <div><strong>Damage Immunities: </strong>
          {data.damage_immunities.map((e) => {
            return (
              <div>{ this.capitalizeFLetter(e) }</div>
            )
          })}
        </div> : null;
        let condition_immunities = data.condition_immunities.length ? <div><strong>Condition Immunities: </strong>
          {data.condition_immunities.map((e) => {
            return (
              <div>{ this.capitalizeFLetter(e) }</div>
            )
          })}
        </div> : null;
        let map_senses = new Map(Object.entries(data.senses));
        let arr_senses = Array.from(map_senses);
        let fixed_arr = this.loopNestArr(arr_senses);
        let senses = fixed_arr.map((el) => {
          return(            
            <li>{ this.capitalizeFLetter(el.join(': ')) }</li>
          )
        })
        let languages = this.capitalizeFLetter(data.languages);
        let challenge_rating = data.challenge_rating;
        let special_abilities = data.special_abilities.map((e) => {
          return (
            <div>
              <div><strong>{ e.name }</strong></div>
              <div>Description: { e.desc }</div>
            </div>
          )
        })
        let actions = data.actions.map((e) => {
          return (
            <div>
              <div><strong>{ e.name }</strong></div>
              <div>Description: { e.desc }</div>
            </div>
          )
        })
        let legendary_actions = data.legendary_actions ? data.legendary_actions.map((e) => {
          return (
            <div>
              <div><strong>{ e.name }</strong></div>
              <div>Description: { e.desc }</div>
            </div>
          )
        }) : []
        
        

        

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
          languages: languages,
          challenge_rating: challenge_rating,
          special_abilities: special_abilities,
          actions: actions,
          legendary_actions: legendary_actions 
        }) 
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }



  loopNestArr = (array) => {
    if (array) {
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
    } else {
      return null
    }
    
  }

  capitalizeFLetter = (s) => {
    if(s) {
      var splitStr = s.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
    } else {
      return s
    }
    

    
  }

  render() {
    return (
      <div>
        <div className="name-container">{ this.state.name }</div>
        <div className='border'><strong>Size: </strong>{ this.state.size }</div>
        <div className='border' id="type" ><strong>Type: </strong>{ this.capitalizeFLetter(this.state.type) }</div>
        <div className='border'><strong>Subtype: </strong>{ this.capitalizeFLetter(this.state.subtype) }</div>
        <div className='border'><strong>Alignment: </strong>{ this.capitalizeFLetter(this.state.alignment) }</div>
        <div className='border'><strong>Armor Class: </strong>{ this.state.armor_class.toString() }</div>
        <div className='border'><strong>Hit Points: </strong>{ this.state.hit_points.toString() }</div>
        <div className='border'><strong>Hit Dice: </strong>{ this.state.hit_dice }</div>
        <div className='border'>
            <strong>Speeds: </strong>
            <li>Walking Speed: { this.state.walk_speed }</li>
            <li>Flying Speed: { this.state.fly_speed }</li>
            <li>Swimming Speed: { this.state.swim_speed }</li>
          
        </div>
        <div className='border'>
          <div><strong>Strength: </strong>{ this.state.strength.toString() }</div>
          <div><strong>Dexterity: </strong>{ this.state.dexterity.toString() }</div>
          <div><strong>Constitution: </strong>{ this.state.constitution.toString() }</div>
          <div><strong>Intelligence: </strong>{ this.state.intelligence.toString() }</div>
          <div><strong>Wisdom: </strong>{ this.state.wisdom.toString() }</div>
          <div><strong>Charisma:</strong>{ this.state.charisma.toString() }</div>
        </div>
        <div className='border'><strong>Proficiencies: </strong>{ this.state.proficiencies }</div>
        { this.state.damage_vulnerabilities }
        { this.state.damage_resistances }
        { this.state.damage_immunities }
        { this.state.condition_immunities }
        <div className='border'><strong>Senses:</strong>
          
            { this.state.senses }
          
        </div>
        <div className='border'><strong>Languages: </strong>{ this.state.languages }</div>
        <div className='border'><strong>Challenge Rating: </strong>{ this.state.challenge_rating.toString() }</div>
        <div className='border'><strong>Special Abilities: </strong>{ this.state.special_abilities }</div>
        <div className='border'><strong>Actions: </strong>{ this.state.actions }</div>
        <div className='border'><strong>Legendary Actions: </strong>{ this.state.legendary_actions }</div>
      </div>
    )
  }
}