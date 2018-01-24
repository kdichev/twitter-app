import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  border: 1px solid gray;
  min-height: 100px;
  margin-bottom: 10px;
  padding: 10px;
`

const RedditCard = ({ children, ...rest }) => (
  <StyledCard>{children}</StyledCard>
)

export default RedditCard

