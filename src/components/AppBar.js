import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 64px;
`

const AppBar = ({ children }) => (
  <Header>
    {children}
  </Header>
)

export default AppBar

