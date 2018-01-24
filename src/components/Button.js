import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  margin-left: 5px;
`

const Button = ({ children, ...rest }) => (
  <StyledButton {...rest} >{children}</StyledButton>
)

export default Button

