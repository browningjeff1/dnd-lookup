import React, { Component } from 'react';
import Search from './search.component.jsx';
import Sidebar from './sidebar.component.jsx';
import '../css/content.css';


export default class Content extends Component {
  render() {
    return (
      <main className="content">
        <Search />
        <Sidebar />
      </main>
    )
  }
}