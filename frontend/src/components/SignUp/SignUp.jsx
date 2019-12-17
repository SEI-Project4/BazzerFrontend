import React, { Component } from 'react'
import { Container, Icon } from 'semantic-ui-react'
import { Form, Button, Col, Modal } from 'react-bootstrap'
import axios from 'axios'
import './SignUp.css'

export default class SignUp extends Component {
    state = {
        error: false,
        success: false,
        allusers:[],
        erroruser:false,
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.state.allusers.map((data)=>{
            if(this.state.username==data.username){
                this.setState({
                    erroruser:true
                })
            }else{
                this.setState({
                    erroruser:false
                })
            }
        })
        console.log(this.state.username)
    }
    componentDidMount(){
        axios.get('https://sei-bazaar-backend.herokuapp.com/users/')
        .then(res=>{
            this.setState({
                allusers:res.data.result
            })
            console.log(this.state.allusers)
        })
        .catch(err=>console.log(err))
    }
    submit = (e) => {
        e.preventDefault()
        axios.post('https://sei-bazaar-backend.herokuapp.com/users/', this.state)
            .then(res =>{
                if(res.data.msg == "created successfully"){
                    this.setState({
                        success: true
                    })
                }else if(res.data.msg == "email used !!! change the email"){
                    this.setState({
                        erroremail:true
                    })
                }else{
                    this.setState({
                        erroruser:true
                    })
                }
                })
        
            .catch(err => console.log(err))
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

                            Great you have signed-up successfully!
          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Button href="/login" style={{margin:'0 auto'}} block variant="success" >
                            Proceed </Button>
                    </Modal.Body>
                </Modal>
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
                            {this.state.erroruser ? <Form.Text style={{color:'red'}}>error username already exists</Form.Text>:null}
                            
                            <Form.Control.Feedback type="invalid">
                                {"Please enter a valid & unique username"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.onChange} />
                            {this.state.erroremail ? <Form.Text style={{color:'red'}}>error email already exists</Form.Text>:null}
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

                        <Button style={{marginRight:'10px'}} variant="primary" type="submit">
                            Sign-up </Button>
  <Form.Label>  Already have an account? <a href="/login">Login</a></Form.Label>
                    </Form>
                    <br /><br />
                </Container>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}
