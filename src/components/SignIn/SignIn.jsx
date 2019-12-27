import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Icon,Loader } from 'semantic-ui-react'
import { Form, Button, Alert, Modal } from 'react-bootstrap'
import SweetAlert from 'sweetalert2-react';
import axios from 'axios'
import './SignIn.css'
import Swal from 'sweetalert2'

export default class SignIn extends Component {
    state = {
        error: false,
        success: false,
        errorlogin: false,
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit = (e) => {
        e.preventDefault()
        axios.post('https://sei-bazaar-backend.herokuapp.com/auth/login', this.state)
            .then(res => {
                if (res.message == "Password or email is NOT correct") {
                    this.setState({
                        errorlogin: true
                    })
                    
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'You have successfully signed in',
                        showConfirmButton: false,
                    })
                    window.location.replace("/home")
                    console.log(res.data.token)
                    localStorage.setItem('usertoken', res.data.token)
                }
                console.log(res)
            })

            .catch(err => {this.setState({
                errorlogin: true
            })})
    }

    
    handlesubmit(e) {
        e.preventDefault()
        console.log('checking')
        console.log(this.state.phone)
    }
    render() {

        return (
            <div>
                <Modal
                    size="sm"
                    show={this.state.success}
                    aria-labelledby="example-modal-sizes-title-sm"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title style={{textAlign:'center'}} id="example-modal-sizes-title-sm">
                        <h1><Icon name="rocket"></Icon></h1>
                        <br />

                            Great you have signed-in successfully!
          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Button href="/home" style={{margin:'0 auto'}} block variant="success" >
                    Continue to home </Button>
                    </Modal.Body>
                </Modal>
                <br /><br /><br />
                <Container id="container-signn">

                    <br />
                    <Form onSubmit={this.submit} style={{ width: '80%', margin: '0 auto' }} method="post">
                        <br />
                        <h1 style={{ textAlign: 'center' }}><Icon name="user"></Icon>Login</h1>
                        <br />

                        <br /><br />
                        {this.state.errorlogin == true ? <Alert variant="danger" onClose={() => this.setState({ errorlogin: false })} dismissible>
                            <h6>Password or Email is not correct</h6>
                        </Alert> : null}
                        {/* {this.state.success==true?
                        <Loader active inline='centered' />
                    :null} */}
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
                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <br/>
                        <Button style={{ marginRight: '10px' }} variant="primary" type="submit">
                            Sign-in
  </Button>
                        <Form.Label>  Dont have an account? <a href="/register">Register</a></Form.Label>
                    </Form>
                    <br /><br />
                </Container>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}
