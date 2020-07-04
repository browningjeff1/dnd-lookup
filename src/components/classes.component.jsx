import React, {Component} from 'react';
import Features from './class-components/features.component.jsx';
import Subclass from './class-components/subclasses.component.jsx';
import '../css/classes.css';

export default class Class extends Component {
    constructor(props) {
        super(props);
        this.fetchStartingEquipment = this.fetchStartingEquipment.bind(this);
        this.fetchFeature.bind(this);
        this.fetchClassLevels.bind(this);

        this.state = {
            name: '',
            hit_die: Number,
            proficiency_choices: [],
            proficiencies: [],
            saving_throws: [],
            starting_equipment: [],
            class_levels: [],
            subclasses: [],
            url: this.props.url,
            starting_equipment_url: '',
            starting_equipment_choices: [],
            class_levels_url: '',
            feature_url: '',
            features: '',
            featuresTrue: false,
            classTrue: this.props.classTrue,
            subclasses_url: '',
        }
    }

    fetchFeature = (url) => {
        fetch('https://www.dnd5eapi.co' + url)
            .then((results) => {
                console.log(results)
                return results.json()
            })
            .then((data) => {
                console.log(data)
                let features = data.desc;

                this.setState({
                    features: features,
                })

                console.log(this.state.features)

                
            })
            .catch((error) => {
                console.error('Error: ', error)
            })

        return (
            <div>
                {this.state.features}
            </div>
        )
    }

    fetchClassLevels = () => {
        fetch('https://www.dnd5eapi.co' + this.state.class_levels_url)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                

                let class_levels = data.map((level) => {
                    
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
                })

                this.setState({
                    class_levels: class_levels,
                })
            })
            .catch((error) => {
                console.error('Error: ', error)
            })
    }


    fetchStartingEquipment = () => {
        fetch('https://www.dnd5eapi.co' + this.state.starting_equipment_url)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                console.log(data)
                let starting_equipment = data.starting_equipment.map((e) =>{
                    return (
                        <div>
                            <br />
                            <div>{ e.item.name }</div>
                            <div><strong>Quantity: </strong>{ e.quantity.toString() }</div>    
                        </div>
                )})

                let starting_equipment_choices = data.choice_1.map((e)=> {
                    return (
                        <div>
                        <br />
                            <div>Choose from { e.choose }</div>
                            <div>
                                {e.from.map((e) => {
                                    return(
                                        <div>
                                        <br />
                                            <div>{e.item.name}</div>
                                            <div>Quantity: {e.quantity}</div>
                                        </div>
                                        
                                    )
                                })}
                            </div>
                        </div>
                    )
                })

                this.setState({
                    starting_equipment: starting_equipment,
                    starting_equipment_choices: starting_equipment_choices,
                })
                
            })
            .catch((error) => {
                console.error('Error: ', error)
            })
    }

    componentDidMount() {
        fetch('https://www.dnd5eapi.co' + this.state.url )
            .then( (results) => {
                
                return results.json();
            })
            .then((data) => {
                let name = data.name;
                let hit_die = data.hit_die;
                let proficiency_choices = data.proficiency_choices.map((choice) => {
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
                })
                let proficiencies = data.proficiencies.map((pro) => {
                    return(
                        <div>{pro.name}</div>
                    )
                })

                let starting_equipment_url = data.starting_equipment.url;
                let class_levels_url = data.class_levels.url;
                let subclasses = data.subclasses.map((e) => {
                    return (
                        <div className="subclasses-container">
                            <Subclass url={ e.url } />
                        </div>
                    )
                });
                

                this.setState({
                    starting_equipment_url: starting_equipment_url,
                    class_levels_url: class_levels_url,
                    subclasses: subclasses,
                })

                this.fetchStartingEquipment();

                this.fetchClassLevels();
                
                
                

                this.setState({
                    name: name,
                    hit_die: hit_die,
                    proficiency_choices: proficiency_choices,
                    proficiencies: proficiencies,
                    starting_equipment_url: starting_equipment_url,
                })
            })
            .catch((error) => {
                console.error('Error: ', error);
            })    
    }

    render() {
        return (
            <div className="classContainer">
                <a href="#proficiency">Proficiencies</a>
                <a href="#starting-equipment">Starting Equipment</a>
                <a href="#class-levels">Class Levels</a>
                <a href="#subclasses"> Subclasses</a>
                <h3 className="name-container">{ this.state.name }</h3>
                <p><strong>Hit Die: </strong>{ this.state.hit_die.toString() }</p>
                <div className="jumpTarget" id="proficiency"><strong>Proficiency Choices: </strong>{ this.state.proficiency_choices }</div>
                <div><strong>{ this.state.name } is proficient with: </strong>{ this.state.proficiencies }</div>
                <div className="jumpTarget" id="starting-equipment"><strong>Starting Equipment: </strong>{ this.state.starting_equipment }</div>
                <div>{ this.state.starting_equipment_choices }</div>
                <div  className="jumpTarget" id="class-levels">
                    <strong>Class Levels: </strong>{ this.state.class_levels }  
                </div>
                <div className="jumpTarget" id="subclasses"><strong>Subclasses: </strong>{ this.state.subclasses }</div>
                
            </div>
        )
    }
}