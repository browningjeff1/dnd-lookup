import React, { Component } from 'react';

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-container">
                    <ul className="sidbar-links">
                        <li>Search</li>
                        <li>Advanced Search</li>
                    </ul>
                </div>
            </div>
        )
    }
}