import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'

const Container = styled.div`
  font-size: 25px;
  text-align: center;
  margin-bottom: 15px;
`

//IS_FIBER_READY_YET
export default function Logo() {
  return (
    <Container>
      <img width={200} src={logo} />
    </Container>
  )
}
