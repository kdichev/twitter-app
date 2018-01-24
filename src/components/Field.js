import React from 'react'
import styled from 'styled-components'

const Input = styled.input``

const Field = ({ children, ...rest }) => (
  <Input type='text' {...rest} />
)

export default Field

