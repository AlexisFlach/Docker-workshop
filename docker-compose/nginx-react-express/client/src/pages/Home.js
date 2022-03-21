import React from 'react'
import Register from '../components/Register'

import { Row, Col } from 'react-bootstrap'

const Home = () => {

  const layoutCtrl = (function() {
    let data = "Welcome to the Docker Compose Website!"
      function getData() {
      return data;
    }
    return {
      getData:getData
    }
  })()
  return (
    <Row>
      <Col md>
        {layoutCtrl.getData()}
      </Col>
      <Col md>
        <Register />
      </Col>
    </Row>
  )
}

export default Home
