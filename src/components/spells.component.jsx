import React, {Component} from 'react';

export default class Spell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
        }
    }

    componentDidMount() {
        fetch('https://www.dnd5eapi.co/api/spells/acid-arrow')
            .then( (results) => {
                console.log(results);
                return results.json() 
            })
            .then(data => {
                console.log(data);
                let classes = data.classes.map((clas) => {
                    return(
                        <div>{clas.name}</div>
                    )
                })

                this.setState({classes: classes});
                console.log('state', this.state.classes);
            })
            .catch((error) => {
                console.error('Error: ', error);
            })
        }

    render() {
        return (
            <div className="spellContainer">
                <div className="container-2">
                    {this.state.classes}
                </div>
            </div>
        )
    }
}