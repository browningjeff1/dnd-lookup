import React, { Component } from 'react';
import Search from './search.component.jsx';
import Sidebar from './sidebar.component.jsx';
import '../css/sidebar.css';
import '../css/search.css';


export default class Content extends Component {
    

    render() {
        return (
            <main className="content">
                <Search />
                <Sidebar />
                <script src="../js/search.js" async></script>
            </main>
        )
    }
}