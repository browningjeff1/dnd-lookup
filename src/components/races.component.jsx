import React, {Component} from 'react';
import '../css/races.css'
export default class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      speed: Number,
      ability_bonuses: [],
      alignment: '',
      age: '',
      size: '',
      size_description: '',
      starting_proficiencies: [],
      starting_proficiency_options: [],
      languages: '',
      language_desc: '',
      traits: [],
      trait_options: [],
      subraces: [],
      url: this.props.url
    }
  }

  componentDidMount() {
    fetch('https://www.dnd5eapi.co' + this.state.url)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data)
        let name = data.name;
        let speed = data.speed;
        let ability_bonuses = data.ability_bonuses.map((e) => {
          return (
            <div>{ e.name } : + { e.bonus }</div>
          )
        })
        let alignment = data.alignment;
        let age = data.age;
        let size = data.size;
        let size_description = data.size_description;
        let starting_proficiencies = data.starting_proficiencies.length ? <div className="border"><strong>Starting Proficiencies:</strong>
          {data.starting_proficiencies.map((e) => {
            return (
              <div>
                <div>{ e.name }</div>
              </div>
            )
          })}
        </div> : null;
        let starting_proficiency_options = data.starting_proficiency_options ? <div className="border">Choose from { data.starting_proficiency_options.choose }
          <ul>{ data.starting_proficiency_options.from.map((e) => {
            return <li>{e.name}</li>
          }) }</ul>
        </div> : null
        let languages = <ul>
          { data.languages.map((e) => {
            return (
                <li>{ e.name }</li>
            )
          }) }
        </ul>
        let language_desc = data.language_desc ? data.language_desc : null;
        let traits = <ul>
          {data.traits.map((e) => {
            return(
              <li>{ e.name }</li>
            )
          })}
        </ul>
        let subraces = data.subraces.length ? <div className="border"><strong>Subraces: </strong>
          <ul>
            {data.subraces.map((e) => {
              return (
                <li>{ e.name }</li>
              )
            })}
          </ul>
        </div> : null;

        this.setState({
          name: name,
          speed: speed,
          ability_bonuses: ability_bonuses,
          alignment: alignment,
          age: age,
          size: size,
          size_description: size_description,
          starting_proficiencies: starting_proficiencies,
          starting_proficiency_options: starting_proficiency_options,
          languages: languages,
          language_desc: language_desc,
          traits: traits,
          subraces: subraces,
        })
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }

  render() {
    return(
      <div className='races-container'>
        <div className='name-container'><div>
          { this.state.name }
        </div></div>
        <div className="border"><strong>Speed: </strong>{ this.state.speed.toString() }</div>
        <div className="border"><strong>Ability Bonuses: </strong>{ this.state.ability_bonuses }</div>
        <div className="border"><strong>Alignment: </strong>{ this.state.alignment }</div>
        <div className="border"><strong>Age: </strong>{ this.state.age }</div>
        <div className="border"><strong>Size: </strong>{ this.state.size }</div>
        <div className="border">{ this.state.size_description }</div>
        <div>{ this.state.starting_proficiencies }</div>
        <div>{this.state.starting_proficiency_options}</div>
        <div className="border"> <strong>Languages: </strong> 
          { this.state.languages }
        </div>
        <div className="border">{ this.state.language_desc }</div>
        <div className="border"><strong>Traits: </strong>
          { this.state.traits }
        </div>
        { this.state.subraces }
      </div>
    )
  }
}