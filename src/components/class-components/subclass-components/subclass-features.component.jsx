import React, { Component } from 'react';

export default class SubclassFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: [],
      level: Number,
      url: this.props.url
    }
  }

  componentDidMount() {
    fetch('https://www.dnd5eapi.co' + this.state.url)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let desc = data.desc.map((e) => {
          return (
            <div>{ e }</div>
          )
        })
        let level = data.level;

        this.setState({
          desc: desc,
          level: level,
        })

      })
      .catch((error) => {
        console.error('Error: ', error);
      })
  }

  render() {
    return (
      <div>
        <div>Description: { this.state.desc }</div>
        <div>Level: { this.state.level.toString() }</div>
      </div>
    )
  }
}