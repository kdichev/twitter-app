import { Reddit } from 'graphqlhub-schemas';
import { GraphQLSchema, graphql } from 'graphql';

let schema = new GraphQLSchema({
  query: Reddit.QueryObjectType
});

export const changeSearchQuery = value => {
  return {
    type: 'CHANGE_SEARCH_QUERY',
    value: value
  }
}

export const fetchReddits = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCHING_REDDITS' })
    const { reddit: { searchQuery, limit} } = getState()
    dispatch({ type: 'ADD_SELECTED_SUBREDDIT', subreddit: searchQuery })
    const query = `{
      subreddit(name: "${searchQuery}"){
        newListings(
          limit: 100
        ) {
          title
          fullnameId
          url
          score
          numComments
          author {
            fullnameId
            username
          }
          comments {
            body
          }
        }
      }
    }`
    try {
      const { data: { subreddit: { newListings }}} = await graphql(schema, query)
      dispatch({ type: 'RECIEVE_REDDITS', newReddits: newListings })
    } catch (e) {
      console.log(e)
      dispatch({ type: 'ERROR_RECIEVING_REDDITS' })
    }
  }
}

export const fetchMoreReddits = (lastId) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCHING_REDDITS' })
    const { reddit: { searchQuery, limit } } = getState()
    const query = `{
      subreddit(name: "${searchQuery}"){
        newListings(
          limit: 100
          after: "${lastId}"
        ) {
          title
          fullnameId
          url
          score
          numComments
          author {
            fullnameId
            username
          }
          comments {
            body
          }
        }
      }
    }`
    try {
      const { data: { subreddit: { newListings } } } = await graphql(schema, query)
      dispatch({ type: 'RECIEVE_REDDITS', newReddits: newListings })
    } catch(e) {
      console.log(e)
      dispatch({ type: 'ERROR_RECIEVING_REDDITS' })
    }
  }
}