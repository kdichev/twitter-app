import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import AppBar from './components/AppBar'
import Field from './components/Field'
import Button from './components/Button'

import { connect } from 'react-redux'

import { changeSearchQuery, fetchTweets, fetchMoreReddits } from './actions'

class App extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll, false);
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if(scrolledToBottom) {
      this.props.handleFetchMore()
      this.props.onButtonClick()
    }
  }

  render() {
    const { isFetching, reddits, onInputChange, onButtonClick } = this.props
    return (
      <div>
        <AppBar>
          <Field onChange={onInputChange} placeholder='Subredit...'/>
          <Button disabled={isFetching} onClick={onButtonClick}>Search</Button>
        </AppBar>
        {reddits.map((tweet, index) => <div>{index} {tweet.title}</div>)}
        {isFetching && 'Loading...'}
      </div>
    );
  }
}

const mapStateToProps = ({ reddit: { reddits, loading, limit } }) => {
  return {
    reddits,
    isFetching: loading,
    limit: limit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: () => dispatch(fetchTweets()),
    onInputChange: e => dispatch(changeSearchQuery(e.target.value)),
    handleFetchMore: () => dispatch(fetchMoreReddits())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
