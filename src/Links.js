import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Links extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      isLoggedIn: false,
      isLoggedOut: true,
    })
  }


   login = () => {
    this.setState({
      isLoggedIn: true,
      isLoggedOut: false,
    })
  }

  logout = () => {
    this.setState({
      isLoggedIn: false,
      isLoggedOut: true,
    })
  }

  render() {

    const button = this.state.isLoggedIn ?
      <button onClick={this.logout}>Logout</button> :
      <button onClick={this.login}>Login</button>;

    return (
      <div>
        <Link to='/'>Home</Link><br/>
        
        {button}
      </div>
    );
  }
};