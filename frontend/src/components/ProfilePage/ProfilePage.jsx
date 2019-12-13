import React, { Component } from 'react'
import { Row, Col, Button, Container, Tabs, Tab, Image,Badge } from 'react-bootstrap'
import './ProfilePage.css'
import { IoMdAddCircle } from 'react-icons/io';



export default class ProfilePage extends Component {



    render() {
        return (
            <div>
                <br />
                <Container style={{ marginBottom: '-20px' }}>
                    <Button style={{ width: '250px', marginLeft: '-15px', marginRight: '5px' }} inline-block variant="dark">My Following & Followers</Button>
                    <Button style={{ margin: '0 5px', width: '150px' }} inline-block variant="dark">Watch Later</Button>
                    <Button style={{ margin: '0 5px'}} inline-block variant="success"><IoMdAddCircle style={{marginRight:'5px'}}/>Rate User</Button>
                </Container>
                <br />
                <Container style={{ border: 'solid 2px black', backgroundColor: 'white' }}>
                    <Row style={{ marginTop: '5%' }}>
                        <Col sm={4}><Image style={{ border: 'solid 1px gray', display: 'block', margin: 'auto' }} width="82%" height="auto" src="https://i.imgur.com/0hWpxv0.png" thumbnail />
                            <h4 style={{ float: 'right', width: '90%', marginTop: '5px' }}>Ali hdd</h4></Col>
                        <Col sm={1}></Col>
                        <Col sm={6}>
                            <Row>
                            <Container style={{ border: '1px gray solid', width: '100%', borderRadius: '5px', backgroundColor:'#f8f7f6'}}>
                                    <br />
                                    <h5>Ali Hamidaddin</h5>
                                    <h5>Jeddah</h5>
                                    <div>
                                    <h5 style={{display:'inline-block'}}>Rating: 3.8</h5>
                                    </div>
                                    
                                    <h5>Member since: 3/12/2019</h5>
                                    <h5>Ali.hd1997@hotmail.com</h5>
                                    <h5>0545306262</h5>
                                    <h5>Followers: 4</h5>
                                    <br />
                                </Container>
                            </Row>
                            <Row>
                            <br />
                                <Button style={{ margin: '15px auto', width: '150px' }} block variant="primary">Follow</Button>
                                <br />
                                <Button style={{ margin: '15px auto', width: '150px' }} block variant="warning">Message</Button>
                                <Button style={{ margin: '15px auto', width: '150px' }} block variant="warning">My Messages</Button>  
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <Container>
                    <h4>Description:</h4>
                    <p>is nullam lacinia deserunt ipsum veritatis, quaerat vivamus ullam! Qui hymenaeos curabitur excepteur voluptates, ducimus, condimentum gravida natus. Ea? Nisl corrupti? Sapien totam vehicula laborum quibusdam anim officia autem eaque varius quod repudiandae? Sociosqu penatibus similique, venenatis ipsum sequi! Ullam dolore totam blandit fames primis! Sit distinctio, </p>
                    </Container>
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
                <Button style={{ width: '150px', margin: '0 auto' }} block variant="info">Edit Profile</Button>
                <br />
                <Container>
                <Row>
                    <Col>
                        <Button style={{ float: 'left', width: '150px', marginLeft: '30%' }} inline-block variant="success">Verify User</Button>
                    </Col>
                    <Col><Button style={{ float: 'right', width: '150px', marginRight: '30%' }} inline-block variant="danger">Delete User</Button></Col>
                </Row>
                </Container>
                <br /><br />
                <br /><br /><br />
                <br />
            </div>
        )
    }
}
