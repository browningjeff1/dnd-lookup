import React, { Component } from 'react';

export default class Features extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            features: [],
        }
    }

    componentDidMount() {
        fetch('https://www.dnd5eapi.co' + this.state.url)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                let features = data.desc.map((feat) => {
                    return (
                        <div className="desc-container">
                            <div>{ feat }</div>
                        </div>
                    )
                })

                this.setState({
                    features: features,
                })
            })
            .catch((error) => {
                console.error('Error: ', error)
            })
    }

    render() {
        return (
            <div className="class-levels-container">
                <div>{this.state.features}</div>
            </div>
        )
    }
}