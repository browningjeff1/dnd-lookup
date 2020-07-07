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
            senses: {},
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
                console.log(walk_speed)
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
                })

                console.log(this.state.walk_speed)
            })
            .catch((err) => {
                console.error('Error: ', err)
            })
    }

    capitalizeFLetter = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
        
    }

    render() {
        return (
            <div>
                <div className="name-container">{ this.state.name }</div>
                <div><strong>Size: </strong>{ this.state.size }</div>
                <div id="type" ><strong>Type: </strong>{ this.capitalizeFLetter(this.state.type) }</div>
                <div><strong>Subtype: </strong>{ this.state.subtype }</div>
                <div><strong>Alignment: </strong>{ this.state.alignment }</div>
                <div><strong>Armor Class: </strong>{ this.state.armor_class.toString() }</div>
                <div><strong>Hit Points: </strong>{ this.state.hit_points.toString() }</div>
                <div><strong>Hit Dice: </strong>{ this.state.hit_dice }</div>
                <div><strong>Speed: </strong>
                    <ul>
                        <li>Walking Speed: { this.state.walk_speed }</li>
                        <li>Flying Speed: { this.state.fly_speed }</li>
                        <li>Swimming Speed: { this.state.swim_speed }</li>
                    </ul>
                </div>
            </div>
        )
    }
}