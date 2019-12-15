import React, { Component } from 'react'
import { Container, Icon } from 'semantic-ui-react'
import { Form, Button, Col } from 'react-bootstrap'
import './SignUp.css'

export default class SignUp extends Component {
    state={
        phone: null
    }
    onChange = (e)=>{
        this.setState({
          phone : e.target.value
        })
        console.log(e.target.value)
        
        }
        
    handlesubmit(e){
        e.preventDefault()
        console.log('checking')
        console.log(this.state.phone)
    }
    render() {
        
        return (
            <div>
                <br/><br/><br/>
                <Container id="container-signupp">
                <br/>
                    <Form onSubmit={this.handlesubmit} style={{width:'80%', margin:'0 auto'}}>
                    <br/>
                    <h1 style={{textAlign:'center'}}><Icon name="user"></Icon>Sign-up</h1>
                        <br/><br/>
                        
                        <Form.Group controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="name" placeholder="Enter Username" />
                            </Form.Group>

                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        
                        
                        <Form.Group controlId="formGridFirstname">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="name" placeholder="Enter your first name" />
                            </Form.Group>

                            <Form.Group controlId="formGridLastname">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="name" placeholder="Enter your last name" />
                            </Form.Group>

                            <Form.Group controlId="formGridPhonenumber">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control onChange={this.onChange} name="phonenumber" type="number" placeholder="phone number" />
                            </Form.Group>
                        

                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign-up
  </Button>
                    </Form>
                    <br/><br/>
                </Container>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}
