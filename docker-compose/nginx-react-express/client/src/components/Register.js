import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import LinkButton from '../components/LinkButton'

import axios from 'axios'

const Register = () => {

  const [username, setUsername] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername(e.target.value)
    await axios.post('/api/register', {
      username: username
    }
    );
    setUsername("")
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="username" placeholder="John Doe" onChange={e => setUsername(e.target.value)}/>
        <Form.Text className="text-muted">
          Add a username
        </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        <hr />
        <LinkButton urlInfo="about" urlText="Read more"/>
        </Form>
  )
}

export default Register
