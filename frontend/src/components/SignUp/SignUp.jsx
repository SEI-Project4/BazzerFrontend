import React, { Component } from 'react'
import { Container, Icon } from 'semantic-ui-react'
import { Form, Button, Col } from 'react-bootstrap'
import SweetAlert from 'sweetalert2-react';
import axios from 'axios'
import './SignUp.css'

export default class SignUp extends Component {
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
        axios.post('https://sei-bazaar-backend.herokuapp.com/users/', this.state)
            .then(res =>{
                if(res.data.msg == "created successfully"){
                    this.setState({
                        success: true
                    })
                }
                console.log(res)})
        
            .catch(err => console.log(err))
    }
    render() {

        return (
            <div>
                <SweetAlert
                style={{backgroundColor:'black'}}
                    show={this.state.success}
                    title="Great!"
                    text="You have signed up successfully"
                    onConfirm={() => {
                        this.setState({ success: false })
                        this.props.history.push('/home')
                    }}
                />
                <br /><br /><br />
                <Container id="container-signupp">
                    <br />
                    <Form onSubmit={this.submit} style={{ width: '80%', margin: '0 auto' }} method="post">
                        <br />
                        <h1 style={{ textAlign: 'center' }}><Icon name="user"></Icon>Sign-up</h1>
                        <br /><br />

                        <Form.Group controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control isInvalid={this.state.error} type="name" name="username" placeholder="Enter Username" onChange={this.onChange} />
                            <Form.Control.Feedback type="invalid">
                                {"Please enter a valid & unique username"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.onChange} />
                        </Form.Group>

                        <Form.Group controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={this.onChange} />
                        </Form.Group>


                        <Form.Group controlId="formGridFirstname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="name" name="firstname" placeholder="Enter your first name" onChange={this.onChange} />
                        </Form.Group>

                        <Form.Group controlId="formGridLastname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="name" name="lastname" placeholder="Enter your last name" onChange={this.onChange} />
                        </Form.Group>

                        <Form.Group controlId="formGridPhonenumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control onChange={this.onChange} name="phonenumber" type="number" placeholder="phone number" onChange={this.onChange} />
                        </Form.Group>


                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign-up
  </Button>
                    </Form>
                    <br /><br />
                </Container>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}
