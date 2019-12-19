import React, { Component } from 'react'
import './PostStyle.css'
import { Row, Col, Container, Carousel } from 'react-bootstrap'
import { Divider, Header, Icon, Comment, Form, Button, Segment, Input, Loader } from 'semantic-ui-react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import Swal from 'sweetalert2'

export default class PostReady extends Component {

    state = {
        guest: false,
        data: '',
        loading: true,
        loading2: false,
        bidslength: 0,
        data2:'',
        token:'',
    }


    componentDidMount = () => {
        let self = this;

        if (localStorage.usertoken) {
            jwt.verify(localStorage.usertoken, 'secret', function (err, decoded) {
                if (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Session expired please login again',
                        showConfirmButton: true,
                    })
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
                        console.log("bids length")
                        console.log(self.state.bidslength)
                    })
                        .catch(err => console.log(err))
                }
            });

        } else { this.setState({ guest: true }) }


    }

    componentDidUpdate = () =>{
        axios.get(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                data2:res.data.result.bids, bidslength: res.data.result.bids.length
            })
            
        }).catch(err=>console.log(err))
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
                if (res.data.msg == "created successfully") {
                    window.location.reload();
                }
                console.log(res)
            })

            .catch(err => console.log(err))
    }
    delete = (e) => {
        this.setState({ loading2: true })
        console.log("deleting")
        axios.delete(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
                if (res.data.msg == "the post has been deleted ") {
                    window.location.replace("/home");
                }
            })
            .catch(err => console.log(err))
    }

    later = (e) => {
        console.log("watching later")
        axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}/watchlater`, this.state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
                if (res.data.msg == "post added to watch later") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Post have been added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => console.log(err))
    }

    BidOnChange=(e)=>{
        this.setState({
            value:e.target.value
        })
        console.log(this.state)
    }

    submitBid = (e) =>{
        console.log(this.state)
        // e.preventDefault()
        axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}/bid`, this.state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
                console.log(res)
                if(res.data.msg=="value must be greater than current bid"){
                    Swal.fire({
                        icon: 'error',
                        title: 'value must be greater than current bid',
                        showConfirmButton: true,
                    })
                }else if(res.data.msg=="you cant bid on your post ! or you have to pass value as number"){
                    Swal.fire({
                        icon: 'error',
                        title: 'you cant bid on your post',
                        showConfirmButton: true,
                    })
                }else if(res.data.msg=="item is Sold out!"){
                    Swal.fire({
                        icon: 'error',
                        title: 'item sold out',
                        timer: 4000
                    })
                }else if(res.data.msg=="bid regesterd"){
                    console.log("bid sent")
                }
            })
            .catch(err => console.log(err))
    }

    Buy = (e) =>{
        axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}/buy`, this.state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res=>{
            if(res.data.msg=="buy order regesterd"){
                Swal.fire({
                    icon: 'success',
                    title: 'You have purchased this order, you will be contacted by seller',
                    showConfirmButton: true,
                })
            }else if(res.data.msg=="item is Sold out!"){
                Swal.fire({
                    icon: 'error',
                    title: 'item sold out!',
                    showConfirmButton: true,
                })
            }
            
        }).catch(err=>{

        })
    }

    approve= (e) =>{
        axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}/isapproved`, this.state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res=>{
            if(res.data.msg=="isapproved status changed"){
                Swal.fire({
                    icon: 'success',
                    title: 'post have been approved',
                    showConfirmButton: true,
                })
                window.location.replace("/approve");
            }else if(res.data.msg=="item is Sold out!"){
                Swal.fire({
                    icon: 'error',
                    title: 'item sold out!',
                    showConfirmButton: true,
                })
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <br />
                <Container>

                    {this.state.token === undefined ? null : this.state.token.isadmin == true ?
                        <Row>
                            <Col><Button onClick={this.delete} floated='left' color='red'>Delete Post</Button></Col>
                            <Col><Button floated='right' color='orange'>Close Post</Button></Col>
                        </Row> : null}

                    <br /><br />
                </Container>
                <Container>
                    <h3><a href={"http://localhost:3000/profile/" + this.state.data.user} style={{ textDecoration: 'none', color: 'black' }}><strong>By:</strong> {this.state.data.username}</a></h3>
                </Container>
                <br />
                {this.state.loading2 === true ? <div><Loader content='Loading' active inline='centered' /></div> : null}
                <Container style={{ marginBottom: '30px' }}>
                    {this.state.data.postimages !== undefined ?
                        <Carousel style={{ border: '2px solid black' }} >
                            {this.state.data.postimages[0] ?
                                <Carousel.Item id="CarouselPost">
                                    <img
                                        src={this.state.data.postimages[0]}
                                        alt="First slide"
                                        width="100%" height="100%"
                                    // style={{minWidth:'100%'}}
                                    />
                                </Carousel.Item> : null}
                            {this.state.data.postimages[1] ?
                                <Carousel.Item id="CarouselPost">
                                    <img
                                        src={this.state.data.postimages[1]}
                                        alt="First slide"
                                        width="100%" height="100%"
                                    />
                                </Carousel.Item> : null}
                            {this.state.data.postimages[2] ?
                                <Carousel.Item id="CarouselPost">
                                    <img
                                        src={this.state.data.postimages[2]}
                                        alt="First slide"
                                        width="100%" height="100%"
                                    />
                                </Carousel.Item> : null}
                            {this.state.data.postimages[3] ?
                                <Carousel.Item id="CarouselPost">
                                    <img
                                        src={this.state.data.postimages[3]}
                                        alt="First slide"
                                        width="100%" height="100%"
                                    />
                                </Carousel.Item> : null}
                            {this.state.data.postimages[4] ?
                                <Carousel.Item id="CarouselPost">
                                    <img
                                        src={this.state.data.postimages[4]}
                                        alt="First slide"
                                        width="100%" height="100%"
                                    />
                                </Carousel.Item> : null}
                        </Carousel> : null}
                    {this.state.loading === true ? <div><Loader content='Loading' active inline='centered' /></div> : null}
                </Container>

                <Container>
                    <Row>
                        <Col lg={9} md={8} sm={12}>
                            <Container>
                            <h1>{this.state.data.title}</h1><h4 style={{textAlign:'right', display:'inline-block'}}>{this.state.data.views}views</h4>
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
                                    {this.state.token.isadmin===true?<Button onClick={this.approve} style={{ margin: '15px auto', width: '160px', color: 'black', display: 'block' }} color='green'>Approve post</Button>:null}

                                    <Button onClick={this.later} style={{ margin: '15px auto', width: '160px', }} color='grey'><Icon name="plus circle"></Icon>Watch later</Button>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <br /><br />
                    {this.state.data.startingbid > 0 ?

                        <Row>
                            <Col>
                                <Segment style={{ width: '300px', margin: '0 auto', textAlign: 'center', backgroundColor: '#a39ea0' }}>
                                    
                                    <h3 style={{ textAlign: 'center', fontWeight: '500' }}>:Top 3 biders:</h3>
                                    {this.state.bidslength>0?
                                    <Segment>
                                        <a style={{color:'black'}} href={"/profile/" + this.state.data2[this.state.bidslength - 1].userid}>
                                        <h5> <strong>1: {this.state.data2[this.state.bidslength - 1].username}{"="}{this.state.data2[this.state.bidslength - 1].value}SAR</strong></h5></a>
                                        <a style={{color:'black'}} href={"/profile/" + this.state.data2[this.state.bidslength - 2].userid}>
                                        <h5> <strong>2: {this.state.data2[this.state.bidslength - 2].username}{"="}{this.state.data2[this.state.bidslength - 2].value}SAR</strong></h5></a>
                                        <a style={{color:'black'}} href={"/profile/" + this.state.data2[this.state.bidslength - 3].userid}>
                                        <h5> <strong>3: {this.state.data2[this.state.bidslength - 3].username}{"="}{this.state.data2[this.state.bidslength - 3].value}SAR</strong></h5></a>
                                        </Segment>:null}
                                    
                        <br/>
                                    <h3><strong>Current Bid: {this.state.bidslength>0? this.state.data2[this.state.bidslength - 1].value:this.state.data.startingbid}SAR</strong></h3>

                                    <h4 style={{ display: 'inline-block', fontWeight: '600', marginRight: '5px' }}>Add a bid</h4><Input name="value" type="number" onChange={this.BidOnChange} style={{ width: '100px', margin: '10px auto' }}></Input>
                                    <br /><br />
                                    <Button onClick={this.submitBid} primary>Submit</Button>
                                </Segment>
                            </Col>

                        </Row> : this.state.data.price > 0 ? <Segment style={{ width: '300px', margin: '0 auto', textAlign: 'center', backgroundColor: '#a39ea0' }}><h3><strong>Price: {this.state.data.price} SAR</strong></h3>

                            <br />
                            <Button style={{marginBottom:'10px'}} onClick={this.Buy} primary>Buy</Button>
                                    <h5>Quantity: <strong>{this.state.data.quantity}</strong></h5>
                        </Segment> : null}

                    <br /><br />
                </Container>

                <Container>
                    <Divider horizontal><Header as='h3'>
                        <Icon name='comments' />
                        Comments
      </Header></Divider>
                    <Comment.Group>
                        {this.state.data.comments !== undefined ? this.state.data.comments.map((comment) => {
                            return <Comment>
                                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                <Comment.Content>
                                    <Comment.Author href={"/profile/" + comment.user}>{comment.username}</Comment.Author>
                                    <Comment.Text>
                                        <p>{comment.description} </p>
                                    </Comment.Text>
                                </Comment.Content>
                            </Comment>
                        }) : null}
                        <br />
                        <Form method="post" onSubmit={this.submit} reply>
                            <Form.TextArea name="description" onChange={this.onChange} />
                            <Button onClick={this.submit} type="submit" content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </Container>
                <br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}
