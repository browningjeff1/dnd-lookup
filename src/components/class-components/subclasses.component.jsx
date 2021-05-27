import React, { Component } from "react";

export default class Subclass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      name: "",
      subclass_flavor: "",
      desc: [],
      features: [],
      subclass_features_url: "",
    };
  }

  componentDidMount() {
    fetch("https://www.dnd5eapi.co" + this.props.url)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        let name = data.name;
        let subclass_flavor = data.subclass_flavor;
        let desc = data.desc.map((e) => {
          return (
            <div className="subclass-desc-container">
              <div>{e}</div>
            </div>
          );
        });
        this.setState({
          name: name,
          subclass_flavor: subclass_flavor,
          desc: desc,
          // features: features,
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  componentWillUnmount() {
    const abortController = new AbortController();
    abortController.abort();
  }

  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <div>Subclass Flavor: {this.state.subclass_flavor}</div>
        <div>Description: {this.state.desc}</div>
        {/* <div>Features: { this.state.features }</div> */}
      </div>
    );
  }
}
