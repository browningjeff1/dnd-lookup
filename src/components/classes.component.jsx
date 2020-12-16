import React, {useState, useEffect} from 'react';
import Subclass from './class-components/subclasses.component.jsx';
import StartingEquipment from './class-components/StartingEquipment.jsx';
import ClassLevels from './class-components/ClassLevels.jsx';
import '../css/classes.css';
import AuthService from '../services/auth.service';
import { api } from '../functions/ApiCall.js';

export default function Classes(props) {
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(null);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())

  async function fetchData() {
    const dataResult = await api.ApiCall(props.url)
    setData(dataResult)
  }

  useEffect(() => {    
    const abortController = new AbortController()
    
    fetchData();
    return () => {
      abortController.abort()
    }
  }, []);

  useEffect(() => () => console.log('unmount'), [] )

  const handleSaveClick = (e) => {
    e.preventDefault()
    console.log(currentUser)
    const url = this.props.url
    AuthService.save(url, currentUser)
  }

  const handleUnsaveClick = (e) => {
    e.preventDefault();
    console.log(currentUser)
    const url = this.props.url;
    AuthService.unsave(url, currentUser);
  }

  const button = () => {
    
    const button = []
    if (saved) {
      if (saved.includes(props.url)) {               
        button.push(<button onClick={handleUnsaveClick}>Unsave</button>)              
      } else {               
        button.push(<button onClick={handleSaveClick}>Save</button>)          
      }   
    } else {
      button.push(<button onClick={handleSaveClick}>Save</button>)           
    }       
    return button
  }

  
  return (
    <div>
      {data && <div id={props.id} className="classContainer">
        {button()}
        <div>
          <a href="#proficiency">Proficiencies</a>
          <a href="#starting-equipment">Starting Equipment</a>
          <a href="#class-levels">Class Levels</a>
          <a href="#subclasses"> Subclasses</a>
        </div>
        <h3 className="name-container">{ data.name }</h3>
        <div className="logo-container">
        <img className="classLogo" src={'../images/classLogos/' + data.name + '.png' } alt="class logo" type="image/png" />
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
        <div className="starting-equipment-container">
          <StartingEquipment url={data.starting_equipment} />
        </div>
        <div  className="jumpTarget class-levels-container" id="class-levels">
          <ClassLevels url={data.class_levels} />
        </div>
        <div className="jumpTarget border" id="subclasses"><strong>Subclasses: </strong>{ data.subclasses.map((e) => {
            return (
              <div className="subclasses-container">
                <Subclass url={ e.url } />
              </div>
            )
          }) }</div>               
      </div>}
    </div>
  )
}