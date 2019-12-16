import React, { Component } from 'react'
import './PostStyle.css'
import { Row, Col, Container, Carousel } from 'react-bootstrap'
import { Divider, Header, Icon, Comment, Form, Button, Segment, Input } from 'semantic-ui-react'

export default class PostReady extends Component {
    render() {
        return (
            <div>
                <br />
                <Container>
                    <Row>
                        <Col><Button floated='left' color='red'>Delete Post</Button></Col>
                        <Col><Button floated='right' color='orange'>Close Post</Button></Col>
                    </Row>
                    <br /><br />
                </Container>
                <Container>
                    <h3><a style={{ textDecoration: 'none', color: 'black' }} href="">By: Ali hd</a></h3>
                </Container>
                <br />
                <Container style={{ marginBottom: '30px' }}>
                    <Carousel style={{ border: '2px solid black' }} >
                        <Carousel.Item id="CarouselPost">
                            <img
                                src="https://i.imgur.com/PU5Zex0.jpg"
                                alt="First slide"
                                width="100%" height="100%"
                            />
                        </Carousel.Item>
                        <Carousel.Item id="CarouselPost">
                            <img
                                src="https://i.imgur.com/PU5Zex0.jpg"
                                alt="Third slide"
                                width="100%" height="100%"
                            />
                        </Carousel.Item>
                        <Carousel.Item id="CarouselPost">
                            <img
                                src="https://i.imgur.com/PU5Zex0.jpg"
                                alt="Third slide"
                                width="100%" height="100%"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Container>


                <Container>
                    <Row>
                        <Col lg={9} md={8} sm={12}>
                            <Container>
                                <h1>Post title</h1>
                                <br />
                                <Divider horizontal>
                                    <Header as='h4'>
                                        <Icon name='tag' />
                                        Description </Header>
                                </Divider>
                                <h3>Description:</h3>
                                <br />
                                <h4>Location: </h4>
                                <br />
                                <h4>Created on: </h4>
                                <Button circular icon='settings' />
                            </Container>
                        </Col>
                        <Col lg={3} md={4} sm={12}>
                            <Container style={{ margin: '0 auto', textAlign: 'center' }}>
                                <div class="ui vertical buttons">
                                    <Button style={{ margin: '15px auto', width: '160px', color: 'black', display: 'block' }} color='yellow'><Icon name="envelope"></Icon>Message Seller</Button>
                                    <Button style={{ margin: '15px auto', width: '160px', }} color='grey'><Icon name="plus circle"></Icon>Watch later</Button>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <br /><br />
                    <Segment style={{ width: '300px', margin: '0 auto', textAlign: 'center', backgroundColor: '#a39ea0' }}><h3><strong>Current Bid: 200SAR</strong></h3>

                        <h4 style={{ display: 'inline-block', fontWeight: '600', marginRight: '5px' }}>Add a bid</h4><Input style={{ width: '100px', margin: '10px auto' }}></Input>
                        <br /><br />
                        <Button primary>Submit</Button>
                    </Segment>
                    <br /><br />
                </Container>

                <Container>
                    <Divider horizontal><Header as='h3'>
                        <Icon name='comments' />
                        Comments
      </Header></Divider>
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                            <Comment.Content>
                                <Comment.Author>Joe Henderson</Comment.Author>
                                <Comment.Metadata>
                                    <div>1 day ago</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <p>
                                        The hours, minutes and seconds stand as visible reminders that your
                                        effort put them all there.
          </p>
                                    <p>
                                        Preserve until your next run, when the watch lets you see how
                                        Impermanent your efforts are.
          </p>
                                </Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>

                        <Comment>
                            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                            <Comment.Content>
                                <Comment.Author>Christian Rocha</Comment.Author>
                                <Comment.Metadata>
                                    <div>2 days ago</div>
                                </Comment.Metadata>
                                <Comment.Text>I re-tweeted this.</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>

                        <Form reply>
                            <Form.TextArea />
                            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </Container>
                <br />
            </div>
        )
    }
}
