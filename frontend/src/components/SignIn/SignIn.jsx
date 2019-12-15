import React, { Component } from 'react'
import { Container, Icon } from 'semantic-ui-react'
import { Form, Button } from 'react-bootstrap'
import './SignIn.css'

export default class SignIn extends Component {
    render() {
        return (
            <div>
                <br/><br/><br/>
                <Container id="container-signn">
                <br/>
                    <Form style={{width:'80%', margin:'0 auto'}}>
                    <br/>
                        <h1 style={{textAlign:'center'}}><Icon name="user"></Icon>Login</h1>
                        <br/><br/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign-in
  </Button>
                    </Form>
                    <br/><br/>
                </Container>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}
