import React, { Component } from 'react';
import Routes from '../Screens/index'
import './style.css'

// Drawer Material
import Drawer from '../Helper/Drawer/'


class App extends Component {
  

  render() {
    return (
      <div>
          <Drawer ref={this.showDrawer} />
            <Routes/>
      </div>
      
    );
  }
}

export default App;