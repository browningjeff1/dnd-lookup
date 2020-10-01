import React, {Component} from 'react';
import Features from './class-components/features.component.jsx';
import Subclass from './class-components/subclasses.component.jsx';
import '../css/classes.css';
import Barbarian from '../images/classLogos/Barbarian.png';
import Bard from '../images/classLogos/Bard.png';
import Cleric from '../images/classLogos/Cleric.png';
import Druid from '../images/classLogos/Druid.png';
import Fighter from '../images/classLogos/Fighter.png';
import Paladin from '../images/classLogos/Paladin.png';
import Monk from '../images/classLogos/Monk.png';
import Ranger from '../images/classLogos/Ranger.png';
import Rogue from '../images/classLogos/Rogue.png';
import Sorcerer from '../images/classLogos/Sorcerer.png';
import Warlock from '../images/classLogos/Warlock.png';
import Wizard from '../images/classLogos/Wizard.png';
// import fetchStartingEquipment from './class-functions/classFunctions'
import AuthService from '../services/auth.service';

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
            i: Number,
            currentUser: AuthService.getCurrentUser(),
            saved: AuthService.displaySaved(),
            
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
                                            <div>{e.item.name}</div>
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

    findClassLogo = () => {
        if (this.state.name ==='Barbarian') {
            return(
                <img className="classLogo" src={Barbarian} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Bard') {
            return(
                <img className="classLogo" src={Bard} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Cleric') {
            return(
                <img className="classLogo" src={Cleric} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Druid') {
            return(
                <img className="classLogo" src={Druid} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Fighter') {
            return(
                <img className="classLogo" src={Fighter} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Paladin') {
            return(
                <img className="classLogo" src={Paladin} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Monk') {
            return(
                <img className="classLogo" src={Monk} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Ranger') {
            return(
                <img className="classLogo" src={Ranger} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Rogue') {
            return(
                <img className="classLogo" src={Rogue} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Sorcerer') {
            return(
                <img className="classLogo" src={Sorcerer} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Warlock') {
            return(
                <img className="classLogo" src={Warlock} alt="class logo" type="image/png" />
            )
        } else if (this.state.name ==='Wizard') {
            return(
                <img className="classLogo" src={Wizard} alt="class logo" type="image/png" />
            )
        }
    }

    componentDidMount() {
        fetch('https://www.dnd5eapi.co' + this.state.url )
            .then((results) => {  
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
                
                this.findClassLogo();
                this.classNameIcon();
            })
            .catch((error) => {
                console.error('Error: ', error);
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
        return (
            <div id={this.props.id} className="classContainer">
                {this.button()}
                <div>
                    <a href="#proficiency">Proficiencies</a>
                    <a href="#starting-equipment">Starting Equipment</a>
                    <a href="#class-levels">Class Levels</a>
                    <a href="#subclasses"> Subclasses</a>
                </div>
                <h3 className="name-container">{ this.state.name }</h3>
                <div className="logo-container">
                    {this.findClassLogo()}
                </div>
                <p className="border"><strong>Hit Die: </strong>{ this.state.hit_die.toString() }</p>
                <div className="jumpTarget border" id="proficiency"><strong>Proficiency Choices: </strong>{ this.state.proficiency_choices }</div>
                <div className="border"><strong>{ this.state.name } is proficient with: </strong>{ this.state.proficiencies }</div>
                <div className="border">
                    <div className="jumpTarget" id="starting-equipment"><strong>Starting Equipment: </strong>{ this.state.starting_equipment }</div>
                    <div>{ this.state.starting_equipment_choices }</div>
                </div>
                <div  className="jumpTarget border" id="class-levels">
                    <strong>Class Levels: </strong>{ this.state.class_levels }  
                </div>
                <div className="jumpTarget border" id="subclasses"><strong>Subclasses: </strong>{ this.state.subclasses }</div>               
            </div>
        )
    }
}