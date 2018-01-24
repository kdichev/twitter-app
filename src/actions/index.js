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
    const query = `{
      subreddit(name: "${searchQuery}"){
        newListings(limit: ${limit}) {
          title
        }
      }
    }`
    const { data: { subreddit: { newListings }}} = await graphql(schema, query)
    dispatch({ type: 'RECIEVE_REDDITS', newReddits: newListings })
  }
}


export const fetchMoreReddits = () => {
  return async (dispatch, getState) => {
    return dispatch({ type: 'FETCH_MORE' })
  }
}