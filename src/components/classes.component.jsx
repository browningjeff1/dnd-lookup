import React, {Component} from 'react';
import Features from './class-components/features.component.jsx';
import Subclass from './class-components/subclasses.component.jsx';
import '../css/classes.css';
// import { Barbarian, Bard, Cleric, Druid, Fighter, Paladin, Monk, Ranger, Rogue, Sorcerer, Warlock, Wizard } from '../../public/images/classLogos';
import AuthService from '../services/auth.service';
import { api } from '../functions/ApiCall.js';

export default class Class extends Component {
  constructor(props) {
  super(props);

  this.state = {
    url: this.props.url,
    classTrue: this.props.classTrue,
    i: Number,
    currentUser: AuthService.getCurrentUser(),
    saved: AuthService.displaySaved(),
    data: null,
    startingEquipment: null,
    classLevels: null,
    subclasses: null,
    name: null
  }
  }

  async componentDidMount() {
    let data = await api.ApiCall(this.props.url);
    console.log(data);
    let startingEquipment
    let classLevels
    let subclasses

    if (data) {
      startingEquipment = await api.ApiCall(data.starting_equipment)
      classLevels = await api.ApiCall(data.class_levels)
      subclasses = data.subclasses.map((e) => {
      return (
        <div className="subclasses-container">
          <Subclass url={ e.url } />
        </div>
      )
      });
    }

    this.setState({
      data: data,
      startingEquipment: startingEquipment,
      classLevels: classLevels,
      subclasses: subclasses,
      name: data.name
    }) 
  }

  handleSaveClick = (e) => {
    e.preventDefault()
    const { currentUser } = this.state
    console.log(currentUser)
    const url = this.state.url
    AuthService.save(url, currentUser)
  }

  handleUnsaveClick = (e) => {
    e.preventDefault();
    const { currentUser } = this.state
    console.log(currentUser)
    const url = this.state.url;
    AuthService.unsave(url, currentUser);
  }

  button = () => {
    const { saved } = this.state;
    const { url } = this.state;
    const button = []
    if (saved) {
      if (saved.includes(url)) {               
        button.push(<button onClick={this.handleUnsaveClick}>Unsave</button>)              
      } else {               
        button.push(<button onClick={this.handleSaveClick}>Save</button>)          
      }   
    } else {
      button.push(<button onClick={this.handleSaveClick}>Save</button>)           
    }       
    return button
  }

  render() {
  let { data, startingEquipment, classLevels, subclasses } = this.state;
  
  return (
    <div>
    {data && startingEquipment && subclasses && <div id={this.props.id} className="classContainer">
      {this.button()}
      <div>
        <a href="#proficiency">Proficiencies</a>
        <a href="#starting-equipment">Starting Equipment</a>
        <a href="#class-levels">Class Levels</a>
        <a href="#subclasses"> Subclasses</a>
      </div>
      <h3 className="name-container">{ data.name }</h3>
      <div className="logo-container">
      <img className="classLogo" src={'../images/classLogos/' + this.state.name + '.png' } alt="class logo" type="image/png" />
      </div>
      <p className="border"><strong>Hit Die: </strong>{ data.hit_die.toString() }</p>
      <div className="jumpTarget border" id="proficiency"><strong>Proficiency Choices: </strong>{ data.proficiency_choices.map((choice) => {
      return (
        <div>
          <div>Choose from {choice.choose}</div>
          <div>{ choice.from.map((e) => {
            return(
              <div>{e.name}</div>
            )
          }) }</div>
          <br/>
        </div> 
      )
      })}
      </div>
      <div className="border"><strong>{ data.name } is proficient with: </strong>{ data.proficiencies.map((pro) => {
      return(
        <div>{pro.name}</div>
      )
      })}
      </div>
      <div className="border">
      <div className="jumpTarget" id="starting-equipment"><strong>Starting Equipment: </strong>{ startingEquipment.starting_equipment.map((e) =>{
        return (
        <div>
          <br />
          <div>{ e.equipment.name }</div>
          <div><strong>Quantity: </strong>{ e.quantity.toString() }</div>    
        </div>
        )}) 
      }</div>
      <div>{ startingEquipment.starting_equipment_options.map((e)=> {
        return (
        <div>
        <br />
          <div>Choose from { e.choose }</div>
          <div>
          {e.from[0].equipment.name}
          </div>
        </div>
        )
      }) }</div>
      </div>
      <div  className="jumpTarget border" id="class-levels">
      <strong>Class Levels: </strong>{ classLevels.map((level) => {
        return (
        <div className="level-container">
          <br/>
          <div><strong>Level: </strong>{ level.level }</div>
          <div><strong>Ability Score Bonuses: </strong>{ level.ability_score_bonuses }</div>
          <div><strong>Proficiency Bonus: </strong>{ level.prof_bonus }</div>
          <div id="feature-choices">Feature Choices: { level.features.map(feat => {
      
            return (
            <div>
              <div><strong>{ feat.name }</strong>:</div>
              <div>
              {  
                <Features url={feat.url} />
              }
              </div>
              <br />
            </div>
            )
          })}</div>
        </div>
        )
      }) }  
      </div>
      <div className="jumpTarget border" id="subclasses"><strong>Subclasses: </strong>{ this.state.subclasses }</div>               
    </div>}
    </div>
  )
  }
}