import React, { Component } from 'react';
import '../css/header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="logo-container">
                    <img className="logo" src={'../images/dnd-logo.png'} alt="Dungeons and Dragons Logo"/>
                </div>
            </header>
        )
    }
}