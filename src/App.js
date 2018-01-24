import React, { Component } from 'react'

import AppBar from './components/AppBar'
import Field from './components/Field'
import Button from './components/Button'

import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar>
          <Field onChange={this.props.onInputChange}/>
          <Button onClick={this.props.onButtonClick}>Search</Button>
        </AppBar>
        {this.props.tweets.map(tweet => <div>Tweet</div>)}
      </div>
    );
  }
}

const mapStateToProps = ({ twitter: { tweets } }) => {
  return {
    tweets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: () => console.log('onClick'),
    onInputChange: () => console.log('onChange')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
