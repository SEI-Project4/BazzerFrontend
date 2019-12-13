import React, { Component } from 'react'
import { Row, Col, Button, Container, Tabs, Tab, Image, ButtonToolbar } from 'react-bootstrap'
import './ProfilePage.css'



export default class ProfilePage extends Component {



    render() {
        return (
            <div>
                <br/>
                <Container style={{marginBottom:'-20px'}}>
                <Button style={{width:'250px', marginLeft:'-15px', marginRight:'5px' }} inline-block variant="secondary">My Following & Followers</Button>
                <Button style={{ margin: '0 5px',width:'150px' }} inline-block variant="primary">Follow</Button>
                <Button style={{ margin: '0 5px',width:'150px' }} inline-block variant="warning">Message</Button>
                <Button style={{ margin: '0 5px',width:'150px' }} inline-block variant="secondary">Watch Later</Button>
                </Container>
                <br />
                <Container style={{ border: 'solid 2px black', backgroundColor: '#a5a8a4' }}>
                    <Row style={{ marginTop: '5%' }}>
                        <Col sm={4}><Image style={{ border: 'solid 1px black', display: 'block', margin: 'auto' }} width="88%" height="auto" src="https://i.imgur.com/0hWpxv0.png" thumbnail />
                        <h4 style={{float:'right', width:'93%', marginTop:'5px'}}>Ali-hd</h4></Col>
                        <Col sm={2}>
                            <div style={{ marginLeft: '0%' }}>
                                <br/>
                                <Button style={{ margin: '0 auto',width:'150px' }} block variant="primary">Follow</Button>
                                <br/>
                                <Button style={{ margin: '0 auto',width:'150px' }} block variant="warning">Message</Button>
                            </div>
                        </Col>
                        <Col sm={1}></Col>
                        <Col style={{ textAlign: 'left', border:'solid 1px black', borderRadius:'20px'}} sm={4}>
                            <h4>Ali-hd</h4>
                            <h5>Jeddah</h5>
                            <h5>Rating: 3.8</h5>
                            <h5>3/12/2019</h5>
                            <h5>Ali.hd1997@hotmail.com</h5>
                            <h5>Ali Hamidaddin</h5>
                            <h5>0545306262</h5>
                            <h6>Followers: 4</h6>

                        </Col>
                        <Col sm={1}></Col>
                    </Row>
                    <br />
                    <h4>Description:</h4>
                    <p>is nullam lacinia deserunt ipsum veritatis, quaerat vivamus ullam! Qui hymenaeos curabitur excepteur voluptates, ducimus, condimentum gravida natus. Ea? Nisl corrupti? Sapien totam vehicula laborum quibusdam anim officia autem eaque varius quod repudiandae? Sociosqu penatibus similique, venenatis ipsum sequi! Ullam dolore totam blandit fames primis! Sit distinctio, </p>

                    <br /><br />
                    <Tabs defaultActiveKey="posts" id="uncontrolled-tab-example">
                        <Tab eventKey="posts" title="My Posts">
                            <br />
                            <h1>Posts</h1>
                        </Tab>
                        <Tab eventKey="orders" title="My Previous Orders ">
                            <br />
                            <h1>Past Order</h1>
                        </Tab>
                    </Tabs>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                </Container>
                <br />
                <Button style={{ width:'150px', margin:'0 auto'}} block variant="info">Edit Profile</Button>
                <br/>
                <Row>
                    <Col>
                    <Button style={{  float:'left',width:'150px' ,marginLeft:'30%'}} inline-block variant="success">Verify User</Button>
                    </Col>
                    <Col><Button style={{ float:'right',width:'150px',marginRight:'30%'}} inline-block variant="danger">Delete User</Button></Col>
                </Row>
            </div>
        )
    }
}
