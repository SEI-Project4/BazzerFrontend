import React, { Component } from 'react'
import { Container, Icon } from 'semantic-ui-react'
import { Form, Button } from 'react-bootstrap'
import SweetAlert from 'sweetalert2-react';
import axios from 'axios'
import './SignIn.css'

export default class SignIn extends Component {
    state = {
        error: false,
        success: false,
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit = (e) => {
        e.preventDefault()
        axios.post('https://sei-bazaar-backend.herokuapp.com/users/login', this.state)
            .then(res =>{
                if(res.data.token){
                    // this.setState({
                    //     success: true
                    // })
                    console.log(res.data.token)
                }
                console.log(res)})
        
            .catch(err => console.log(err))
    }

    handlesubmit(e) {
        e.preventDefault()
        console.log('checking')
        console.log(this.state.phone)
    }
    render() {
        return (
            <div>
                <br/><br/><br/>
                <Container id="container-signn">
                <br/>
                    <Form onSubmit={this.submit} style={{width:'80%', margin:'0 auto'}} method="post">
                    <br/>
                        <h1 style={{textAlign:'center'}}><Icon name="user"></Icon>Login</h1>
                        <br/><br/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.onChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.onChange} name="password" type="password" placeholder="Password" />
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
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}
