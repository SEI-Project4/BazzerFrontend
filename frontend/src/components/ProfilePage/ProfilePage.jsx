import React, { Component } from 'react'
import { Row, Col, Button, Container, Tabs, Tab, Image, OverlayTrigger, Popover, Form } from 'react-bootstrap'
import './ProfilePage.css'
import { IoMdAddCircle } from 'react-icons/io';
import { Item, Rating, Label } from 'semantic-ui-react'


export default class ProfilePage extends Component {



    render() {
        return (
            <div>
                <br />
                <Container style={{ marginBottom: '-20px' }}>
                    <div style={{ marginLeft: '-15px' }}>
                        <Button style={{ width: '250px', marginRight: '5px' }} inline-block variant="dark">My Following & Followers</Button>
                        <Button style={{ marginLeft: '5px', marginRight: '10px', width: '150px' }} inline-block variant="dark">My Watch list</Button>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={<Popover id="popover-basic">
                            <Popover.Title as="h3">Give a Rating</Popover.Title>
                            <Popover.Content>
                                <Form>
                                    <Rating icon='star' maxRating={5} clearable />
                                    <Form.Control style={{ margin: '5px auto' }} placeholder="Say something?" />
                                    <Button size="sm" variant="primary" type="submit">
                                        Submit </Button>
                                </Form>
                            </Popover.Content>
                        </Popover>}>
                            <Button inline-block variant="success"><IoMdAddCircle style={{ marginRight: '5px' }} />Rate User</Button>
                        </OverlayTrigger>
                    </div>
                </Container>
                <br />
                <Container style={{ border: 'solid 2px black', backgroundColor: 'white' }}>
                    <Row style={{ marginTop: '5%' }}>
                        <Col sm={4}><Image  style={{ border: 'solid 1px gray', display: 'block', margin: 'auto' }} width="82%" height="auto" src="https://i.imgur.com/0hWpxv0.png" thumbnail />
                            <h4 style={{ float: 'right', width: '90%', marginTop: '5px' }}>Ali hdd</h4></Col>
                        <Col sm={1}></Col>
                        <Col sm={6}>
                            <Row>
                                <Container style={{ border: '1px gray solid', width: '100%', borderRadius: '5px', backgroundColor: '#f8f7f6' }}>
                                    <br />
                                    <h5>Ali Hamidaddin</h5>
                                    <h5>Jeddah</h5>
                                    
                                        <h5 >Rating: 3.8</h5>
                                    

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
                        <Col sm={1}></Col>
                    </Row>
                    <br />
                    <Container>
                        <h4>Description:</h4>
                        <p>is nullam lacinia deserunt ipsum veritatis, quaerat vivamus ullam! Qui hymenaeos curabitur excepteur voluptates, ducimus, condimentum gravida natus. Ea? Nisl corrupti? Sapien totam vehicula laborum quibusdam anim officia autem eaque varius quod repudiandae? Sociosqu penatibus similique, venenatis ipsum sequi! Ullam dolore totam blandit fames primis! Sit distinctio, </p>
                    </Container>
                    <br /><br />
                    <Tabs defaultActiveKey="posts" id="uncontrolled-tab-example">
                        <Tab eventKey="posts" title="Posts">
                        <br />
                            
                            <Item.Group>
                                <Item>
                                    <Item.Image size='tiny' src='https://i.imgur.com/8Uirvpc.jpg' />

                                    <Item.Content>
                                        <Item.Header as='a'>Header</Item.Header>
                                        <Item.Meta>Description</Item.Meta>
                                        <Item.Description>
                                            <Image src='/images/wireframe/short-paragraph.png' />
                                        </Item.Description>
                                        <Item.Extra>Additional Details</Item.Extra>
                                    </Item.Content>
                                </Item>

                                <Item>
                                    <Item.Image size='tiny' src='https://a.imge.to/2019/12/14/vfFIKx.png' />

                                    <Item.Content>
                                        <Item.Header as='a'>Macbook</Item.Header>
                                        <Item.Meta>this is a bad product i dont want it</Item.Meta>
                                        <Item.Description>
                                            <Image src='' />
                                        </Item.Description>
                                        <Item.Extra>price 400$</Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Tab>
                        <Tab eventKey="orders" title="Previous Orders">
                            <br />
                            
                            <Item.Group>
                                <Item>
                                    <Item.Image size='tiny' src='https://i.imgur.com/8Uirvpc.jpg' />

                                    <Item.Content>
                                        <Item.Header as='a'>Header</Item.Header>
                                        <Item.Meta>Description</Item.Meta>
                                        <Item.Description>
                                            <Image src='/images/wireframe/short-paragraph.png' />
                                        </Item.Description>
                                        <Item.Extra>Additional Details</Item.Extra>
                                    </Item.Content>
                                </Item>

                                <Item>
                                    <Item.Image size='tiny' src='https://a.imge.to/2019/12/14/vfFIKx.png' />

                                    <Item.Content>
                                        <Item.Header as='a'>Macbook</Item.Header>
                                        <Item.Meta>this is a bad product i dont want it</Item.Meta>
                                        <Item.Description>
                                            <Image src='' />
                                        </Item.Description>
                                        <Item.Extra>price 400$</Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Tab>
                        <Tab eventKey="ratings" title="Ratings">
                            <br />
                            <h1>Ratings and comments</h1>
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
