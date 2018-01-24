import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import AppBar from './components/AppBar'
import Field from './components/Field'
import Button from './components/Button'

import { connect } from 'react-redux'

import { changeSearchQuery, fetchReddits, fetchMoreReddits } from './actions'

class App extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll, false);
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if(scrolledToBottom && !this.props.isFetching) {
      this.props.handleOnFetchMoreReddits(this.props.reddits[this.props.reddits.length - 1].fullnameId)
    }
  }

  render() {
    const { isFetching, reddits, onInputChange, handleOnFetchReddits } = this.props
    return (
      <div>
        <AppBar>
          <Field onChange={onInputChange} placeholder='Subredit...'/>
          <Button disabled={isFetching} onClick={handleOnFetchReddits}>Search</Button>
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
    handleOnFetchReddits: () => dispatch(fetchReddits()),
    onInputChange: e => dispatch(changeSearchQuery(e.target.value)),
    handleOnFetchMoreReddits: (id) => dispatch(fetchMoreReddits(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
