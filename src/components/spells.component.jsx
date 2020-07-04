import React, {Component} from 'react';
import '../css/spells.css';

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

    render() {
        return (
            <div key={this.state.id} className="spellContainer">
                <h3 className="name-container">{ this.state.name }</h3>
                <div className="casting-time-container"><strong>Casting Time: </strong>{ this.state.casting_time }</div>
                <div className="classes-container">
                    <strong>Classes: </strong>{this.state.classes}
                </div>
                <div className="components-container">
                    <strong>Components: </strong>{ this.state.components }
                </div>
                <div className="concentration-container"><strong>Require concentration: </strong>{ this.state.concentration.toString() }</div>
                <div className="desc-container"><strong>Description: </strong>{ this.state.description }</div>
                <div className="duration-container"><strong>Duration: </strong>{ this.state.duration }</div>
                <div className="higher-level-container"><strong>Higher Level: </strong>{ this.state.higher_level }</div>
                <div className="level-container"><strong>Level Requirement: </strong>{ this.state.level.toString() }</div>
                <div className="material-container"><strong>Materials Required: </strong>{ this.state.material }</div>
                <div className="range-container"><strong>Range: </strong>{ this.state.range }</div>
                <div className="ritual-container"><strong>Require Ritual: </strong>{ this.state.ritual.toString() }</div>
                <div className="school-container"><strong>School: </strong>{ this.state.school }</div>
                <div className="subclasses-container"><strong>Subclasses: </strong>{ this.state.subclasses }</div>
            </div>
        )
    }
}