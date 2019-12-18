import React, { Component } from 'react'
import './PostStyle.css'
import { Row, Col, Container, Carousel } from 'react-bootstrap'
import { Divider, Header, Icon, Comment, Form, Button, Segment, Input, Loader } from 'semantic-ui-react'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export default class PostReady extends Component {

    state = {
        guest: false,
        data: '',
        loading: true,
    }


    componentDidMount = () => {
        let self = this;

        if (localStorage.usertoken) {
            jwt.verify(localStorage.usertoken, 'secret', function (err, decoded) {
                if (err) {
                    alert("Your session has expired please login again")
                    self.setState({ guest: true })
                } else {
                    var decoded = jwt.verify(localStorage.usertoken, 'secret')
                    console.log("decoded ==")
                    console.log(decoded);
                    self.setState({ token: decoded, })
                    axios.get(`https://sei-bazaar-backend.herokuapp.com/posts/${self.props.match.params.id}`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } }).then(res => {
                        console.log("data from post id")
                        console.log(res)
                        self.setState({
                            data: res.data.result, loading: false
                        })
                        // self.setState({
                        //     firstname: res.data.result.firstname, lastname: res.data.result.lastname, description: res.data.result.description, profileimg: res.data.result.profileimg, city: res.data.result.city, data: res.data.result
                        // })
                    })
                        .catch(err => console.log(err))
                }
            });

        } else { this.setState({ guest: true }) }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }
    submit = (e) => {
        e.preventDefault()
        axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}`, this.state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
                if(res.data.msg=="created successfully"){
                 window.location.reload();
                }
                console.log(res)
            })

            .catch(err => console.log(err))
    }
    delete = (e) =>{
        console.log("deleting")
        axios.delete(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res=>{
            if(res.data.msg=="the post has been deleted"){
                alert("post deleted")
            }
        })
        .catch(err=>console.log(err))
    }

    later = (e) =>{
        console.log("watching later")
        axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}/watchlater`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res=>{
            if(res.data.msg=="post added to watch later"){
                alert("post added to watch later")
            }
        })
        .catch(err=>console.log(err))
    }

    render() {
        return (
            <div>
                <br />
                <Container>
                    {this.state.token===undefined?null:this.state.token.isadmin==true?
                    <Row>
                    <Col><Button onClick={this.delete} floated='left' color='red'>Delete Post</Button></Col>
                    <Col><Button floated='right' color='orange'>Close Post</Button></Col>
                </Row>:null}
                    
                    <br /><br />
                </Container>
                <Container>
                    <h3><a href={"http://localhost:3000/profile/"+this.state.data.user} style={{ textDecoration: 'none', color: 'black' }} href=""><strong>By:</strong> {this.state.data.username}</a></h3>
                </Container>
                <br />
                <Container style={{ marginBottom: '30px' }}>
                    {this.state.data.postimages!==undefined?
                    <Carousel style={{ border: '2px solid black' }} >
                    {this.state.data.postimages[0] ?
                    <Carousel.Item id="CarouselPost">
                    <img
                        src={this.state.data.postimages[0]}
                        alt="First slide"
                        width="100%" height="100%"
                        // style={{minWidth:'100%'}}
                    />
                    </Carousel.Item>:null}
                    {this.state.data.postimages[1] ?
                    <Carousel.Item id="CarouselPost">
                    <img
                        src={this.state.data.postimages[1]}
                        alt="First slide"
                        width="100%" height="100%"
                    />
                    </Carousel.Item>:null}
                    {this.state.data.postimages[2] ?
                    <Carousel.Item id="CarouselPost">
                    <img
                        src={this.state.data.postimages[2]}
                        alt="First slide"
                        width="100%" height="100%"
                    />
                    </Carousel.Item>:null}
                    {this.state.data.postimages[3] ?
                    <Carousel.Item id="CarouselPost">
                    <img
                        src={this.state.data.postimages[3]}
                        alt="First slide"
                        width="100%" height="100%"
                    />
                    </Carousel.Item>:null}
                    {this.state.data.postimages[4] ?
                    <Carousel.Item id="CarouselPost">
                    <img
                        src={this.state.data.postimages[4]}
                        alt="First slide"
                        width="100%" height="100%"
                    />
                    </Carousel.Item>:null}
                </Carousel>:null}
                {this.state.loading===true?<div><Loader content='Loading' active inline='centered' /></div>:null}
                </Container>

                <Container>
                    <Row>
                        <Col lg={9} md={8} sm={12}>
                            <Container>
                                <h1>{this.state.data.title}</h1>
                                <br />
                                <Divider horizontal>
                                    <Header as='h4'>
                                        <Icon name='tag' />
                                        Description </Header>
                                </Divider>
                                <h4>{this.state.data.description}</h4>
                                <br />
                                <h4>Location: <strong>{this.state.data.city}</strong> </h4>
                                <br />
                                <h4>Created on: {this.state.data.createdAt !== undefined ? this.state.data.createdAt.slice(0, -14) : null} </h4>
                                <Button circular icon='settings' />
                            </Container>
                        </Col>
                        <Col lg={3} md={4} sm={12}>
                            <Container style={{ margin: '0 auto', textAlign: 'center' }}>
                                <div class="ui vertical buttons">
                                    <Button style={{ margin: '15px auto', width: '160px', color: 'black', display: 'block' }} color='yellow'><Icon name="envelope"></Icon>Message Seller</Button>
                                    <Button onClick={this.later} style={{ margin: '15px auto', width: '160px', }} color='grey'><Icon name="plus circle"></Icon>Watch later</Button>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <br /><br />
                    {this.state.data.startingbid >0 ?
                        <Segment style={{ width: '300px', margin: '0 auto', textAlign: 'center', backgroundColor: '#a39ea0' }}><h3><strong>Current Bid: 200SAR</strong></h3>

                            <h4 style={{ display: 'inline-block', fontWeight: '600', marginRight: '5px' }}>Add a bid</h4><Input style={{ width: '100px', margin: '10px auto' }}></Input>
                            <br /><br />
                            <Button primary>Submit</Button>
                        </Segment> :this.state.data.price>0? <Segment style={{ width: '300px', margin: '0 auto', textAlign: 'center', backgroundColor: '#a39ea0' }}><h3><strong>Price: {this.state.data.price} SAR</strong></h3>

                            <br />
                            <Button primary>Buy</Button>
                        </Segment>:null}

                    <br /><br />
                </Container>

                <Container>
                    <Divider horizontal><Header as='h3'>
                        <Icon name='comments' />
                        Comments
      </Header></Divider>
                    <Comment.Group>
                        {this.state.data.comments!==undefined?this.state.data.comments.map((comment)=>{
                            return<Comment>
                            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                            <Comment.Content>
                                <Comment.Author href={"/profile/"+comment.user}>{comment.user}</Comment.Author>
                                <Comment.Text>
                                    <p>{comment.description} </p>
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
                        }):null}
                        <br/>
                        <Form method="post" onSubmit={this.submit} reply>
                            <Form.TextArea name="description" onChange={this.onChange} />
                            <Button onClick={this.submit} type="submit" content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </Container>
                <br />
            </div>
        )
    }
}
