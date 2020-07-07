import React, { Component } from 'react';
import '../css/sidebar.css';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-container">
          <ul className="sidbar-links">
            <li><a href="#top">Back to top</a></li>
            <li>Advanced Search</li>
          </ul>
        </div>
      </div>
    )
  }
}