import React, { Component } from 'react';
import '../css/header.css';

const dndLogo = require('../images/dnd-logo.png');


export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="logo-container">
                    <img className="logo" src={dndLogo} alt="Dungeons and Dragons Logo"/>
                </div>
            </header>
        )
    }
}