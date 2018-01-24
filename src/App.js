import React, { Component } from 'react'
import AppBar from './components/AppBar'
import Field from './components/Field'
import Button from './components/Button'
import RedditCard from './components/RedditCard'
import { connect } from 'react-redux'

import { changeSearchQuery, fetchReddits, fetchMoreReddits } from './actions'

class App extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll, false)
  }

  handleOnScroll = () => {
    const { handleOnFetchMoreReddits, reddits, isFetching } = this.props
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    if(scrolledToBottom && !isFetching) {
      handleOnFetchMoreReddits(reddits[reddits.length - 1].fullnameId)
    }
  }

  render() {
    const { isFetching, reddits, onInputChange, handleOnFetchReddits, searchQuery, selectedSubreddits } = this.props
    return (
      <div>
        <AppBar>
          <Field onChange={onInputChange} placeholder='Subredit...' value={searchQuery} />
          <Button disabled={isFetching || (searchQuery.length < 1)} onClick={handleOnFetchReddits}>Search</Button>
          {selectedSubreddits.map(reddit => reddit)}
        </AppBar>
        {reddits.map((reddit, index) => (
          <RedditCard>
            <a href={reddit.url}>{reddit.title}</a>
            <div>Post by: {reddit.author.username}</div>
            <div>Score: {reddit.score}</div>
            <div>{reddit.numComments} comments</div>
          </RedditCard>
        ))}
        {isFetching && 'Loading...'}
      </div>
    )
  }
}

const mapStateToProps = ({ reddit: { reddits, isFetching, searchQuery, selectedSubreddits } }) => {
  return {
    reddits,
    isFetching,
    searchQuery,
    selectedSubreddits
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleOnFetchReddits: () => dispatch(fetchReddits()),
    onInputChange: e => dispatch(changeSearchQuery(e.target.value)),
    handleOnFetchMoreReddits: (id) => dispatch(fetchMoreReddits(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
