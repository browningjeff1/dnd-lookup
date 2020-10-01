import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Classes from './classes.component.jsx';
import Spells from './spells.component.jsx';
import '../css/profile.css';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.displaySaved = this.displaySaved.bind(this)
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      isSavedDisplayed: false,
      saved: null
    };
  }


  handleClick = (e) => {
    e.preventDefault()
    const { currentUser } = this.state;
    const { isSavedDisplayed } = this.state;
    AuthService.getSaved(currentUser)

    this.setState({
      isSavedDisplayed: !isSavedDisplayed,
      saved: AuthService.displaySaved(),
    })
  }

  conRender = () => {
    this.setState({
      isSavedDisplayed: false,
    })
  }
  
  displaySaved = () => {
    const { isSavedDisplayed } = this.state;
    const { saved } = this.state;
    const fixedSaved = [];
    const pagnation = [];
    if (isSavedDisplayed) {
      if (saved) {for (let i = 0; i < saved.length; i++) {
        if(saved[i].includes('classes')) {
          fixedSaved.push(<div  className='showSaved'>
            <Classes id={i} url={saved[i]}/>
          </div>)
          pagnation.push(<li className='savedList'><a href={'#' + i}>{i}</a></li>)
        } else if (saved[i].includes('spells')) {
          fixedSaved.push(<div className='showSaved'>
            <Spells id={i} url={saved[i]}/>
          </div>)
          pagnation.push(<li className='savedList'><a href={'#' + i}>{i}</a></li>)
        } 
      }}
      
      
       
      
    }
    return (
      <div>
        <div id='savedList' className='savedList'>
          {pagnation}
        </div>
        {fixedSaved}
        
      </div>
    )
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser)

    return (
      <div id='top' className="profileContainer">
        <section className='profile'>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}'s</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong>{" "}
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser.id}
          </p>
          <p className='emailContainer'>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </section>
        <button id='savedButton' onClick={this.handleClick}>{this.state.isSavedDisplayed ? 'Hide' : 'Saved'}</button>
        {this.state.isSavedDisplayed && <div className='search'>
            
          { this.displaySaved() }
        </div>}
      </div>
    );
  }
}