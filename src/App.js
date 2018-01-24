import React, { Component } from 'react';
import AppBar from './components/AppBar'
import Field from './components/Field'
import Button from './components/Button'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar>
          <Field onChange={() => console.log('onChange')}/>
          <Button onClick={() => console.log('Click')}>Search</Button>
        </AppBar>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
