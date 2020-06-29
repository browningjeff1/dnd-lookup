import React from 'react';
import Header from './components/header.component.jsx';
import Content from './components/content.component.jsx';
import './css/header.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faSearch)

function App() {
  return (
    <div>
      <Header />
      <Content />
    </div>
    
  );
}

export default App;
