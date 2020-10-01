import React, {Component} from 'react';
import '../css/spells.css';

import AuthService from '../services/auth.service';
export default class Spells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            casting_time: '',
            classes: [],
            components: [],
            concentration: Boolean,
            desc: [],
            duration: '',
            higher_level: [],
            level: Number,
            material: '',
            name: '',
            range: '',
            ritual: Boolean,
            school: '',
            subclasses: [],
            id: '', 
            url: this.props.url,
            currentUser: AuthService.getCurrentUser()
        }
    }

    componentDidMount() {
        fetch('https://www.dnd5eapi.co' + this.state.url)
            .then( (results) => {
                console.log(results);
                return results.json() 
            })
            .then(data => {
                console.log(data);
                let index = data.index;
                let casting_time = data.casting_time;
                let classes = data.classes.map((e) => {
                    return(
                        <div className="classes">{e.name}</div>
                    )
                });
                let components = data.components.map((component) => {
                    return (
                        <div className="components">{ component }</div>
                    )
                });
                let concentration = data.concentration;
                let description = data.desc.map((des) => {
                    return (
                        <div className="description">{ des }</div>
                    )
                }) 
                let duration = data.duration;
                let higher_level
                if(data.higher_level) {
                    higher_level = data.higher_level.map((level) => {
                        return (
                            <div className="higher-level">{ level }</div>
                        )
                    })
                } else {
                    higher_level = ['N/A'];
                    higher_level.map((level) => {
                        return (
                            <div className="higher-level">{ level }</div>
                        )
                    })
                }
                
                let level = data.level;
                let material = data.material;
                let name = data.name;
                let range = data.range;
                let ritual = data.ritual;
                let school= data.school.name;
                let subclasses = data.subclasses.map((e) => {
                    return (
                        <div>{ e.name }</div>
                    )
                })

                this.setState({
                    casting_time: casting_time,
                    classes: classes,
                    components: components,
                    concentration: concentration,
                    description: description,
                    duration: duration,
                    higher_level: higher_level,
                    id: index,
                    level: level,
                    material: material,
                    name: name,
                    range: range,
                    ritual: ritual,
                    school: school,
                    subclasses: subclasses,
                });
                console.log('state', this.state.classes);
            })
            .catch((error) => {
                console.error('Error: ', error);
            })
        }

    handleClick = (e) => {
        e.preventDefault()
        const { currentUser } = this.state
        console.log(currentUser)
        const url = this.state.url
        AuthService.save(url, currentUser)
    }

    render() {
        return (
            <div key={this.state.id} id={this.props.id} className="spellContainer">
                <button type="submit" onClick={this.handleClick}>Save</button>
                <h3 className="name-container">{ this.state.name }</h3>
                <div className="casting-time-container border"><strong className='block'>Casting Time: </strong>{ this.state.casting_time }</div>
                <div className="classes-container border">
                    <strong className='block'>Classes: </strong>{this.state.classes}
                </div>
                <div className="components-container border">
                    <strong className='block'>Components: </strong>{ this.state.components }
                </div>
                <div className="concentration-container border"><strong className='block'>Require concentration: </strong>{ this.state.concentration.toString() }</div>
                <div className="desc-container border"><strong className='block'>Description: </strong>{ this.state.description }</div>
                <div className="duration-container border"><strong className='block'>Duration: </strong>{ this.state.duration }</div>
                <div className="higher-level-container border"><strong className='block'>Higher Level: </strong>{ this.state.higher_level }</div>
                <div className="level-container border"><strong className='block'>Level Requirement: </strong>{ this.state.level.toString() }</div>
                <div className="material-container border"><strong className='block'>Materials Required: </strong>{ this.state.material }</div>
                <div className="range-container border"><strong className='block'>Range: </strong>{ this.state.range }</div>
                <div className="ritual-container border"><strong className='block'>Require Ritual: </strong>{ this.state.ritual.toString() }</div>
                <div className="school-container border"><strong className='block'>School: </strong>{ this.state.school }</div>
                <div className="subclasses-container border"><strong className='block'>Subclasses: </strong>{ this.state.subclasses }</div>
            </div>
        )
    }
}