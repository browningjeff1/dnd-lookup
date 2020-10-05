import React, {Component} from 'react';
import '../css/races.css'
import { api } from '../functions/ApiCall';

export default class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  async componentDidMount() {
    let data = await api.ApiCall(this.props.url)

    this.setState({
      data: data
    })
  }

  render() {
    let { data } = this.state;
    return(
      <div>
        {data && <div className='races-container'>
          <div className='name-container'>
            { data.name }
          </div>
          <div className="border"><strong>Speed: </strong>{ data.speed.toString() }</div>
          <div className="border"><strong>Ability Bonuses: </strong>{ data.ability_bonuses.map((e) => {
            return (
              <div key={e.index}>{ e.name } : + { e.bonus }</div>
            )
          }) }</div>
          <div className="border"><strong>Alignment: </strong>{ data.alignment }</div>
          <div className="border"><strong>Age: </strong>{ data.age }</div>
          <div className="border"><strong>Size: </strong>{ data.size }</div>
          <div className="border">{ data.size_description }</div>
          <div>{ data.starting_proficiencies.length ? <div className="border"><strong>Starting Proficiencies:</strong>
            {data.starting_proficiencies.map((e) => {
              return (
                <div key={e.index}>
                  <div>{ e.name }</div>
                </div>
              )
            })}
          </div> : null }</div>
          <div>{ data.starting_proficiency_options ? <div className="border">Choose from { data.starting_proficiency_options.choose }
            <ul>{ data.starting_proficiency_options.from.map((e) => {
              return <li key={e.index}>{e.name}</li>
            }) }</ul>
          </div> : null }</div>
          <div className="border"> <strong>Languages: </strong> 
            <ul>
              { data.languages.map((e) => {
                return (
                    <li key={e.index}>{ e.name }</li>
                )
              }) }
            </ul> 
          </div>
          <div className="border">{ data.language_desc ? data.language_desc : null }</div>
          <div className="border"><strong>Traits: </strong>
            <ul>
              {data.traits.map((e) => {
                return(
                  <li key={e.index}>{ e.name }</li>
                )
              })}
            </ul>
          </div>
          { data.subraces.length ? <div className="border"><strong>Subraces: </strong>
            <ul>
              {data.subraces.map((e) => {
                return (
                  <li key={e.index}>{ e.name }</li>
                )
              })}
            </ul>
          </div> : null }
        </div>}
      </div>
    )
  }
}