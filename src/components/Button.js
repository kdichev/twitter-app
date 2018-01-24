import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button``

const Button = ({ children, ...rest }) => (
  <StyledButton {...rest} >{children}</StyledButton>
)

export default Button

