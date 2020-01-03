import React, { Component } from 'react'
import './PostStyle.css'
import { Row, Col, Container, Carousel } from 'react-bootstrap'
import { Divider, Header, Icon, Comment, Form, Button, Segment, Input, Loader } from 'semantic-ui-react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { loadSpost, loadposttask } from "../../actions";
import { Link } from "react-router-dom";

class PostReady extends Component {

    state = {
        guest: false,
        data: '',
        loading: true,
        loading2: false,
        bidslength: 0,
        data2:'',
        token:'',
        bidloading: true
    }


    componentDidMount = () => {
        if(this.props.spost._id != this.props.match.params.id){
            this.props.loadSpost(this.props.match.params.id)
        }
        this.updatebid()
    }

    updatebid = () =>{
        axios.get(`https://sei-bazaar-backend.herokuapp.com/posts/${this.props.match.params.id}/noview`)
        .then(res=>{
            this.setState({
                data2:res.data.result.bids, bidslength: res.data.result.bids.length, bidloading: false
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
        if(this.props.postTask!='Please login')
        this.setState({ type: 'submit', pageid:this.props.match.params.id},()=>{
            let state = this.state
            this.props.loadposttask(state)
        })
    }
    delete = (e) => {
        this.setState({ type: 'delete', pageid:this.props.match.params.id},()=>{
            let state = this.state
            this.props.loadposttask(state)
        })
    }

    later = (e) => {
    if(this.props.postTask!='Please login')
        this.setState({ type: 'later', pageid:this.props.match.params.id},()=>{
            let state = this.state
            this.props.loadposttask(state)
        })
    }

    BidOnChange=(e)=>{
        this.setState({
            value:e.target.value
        })
    }

    submitBid = (e) =>{
        if(this.props.postTask!='Please login')
        this.setState({ type: 'submitBid', pageid:this.props.match.params.id},()=>{
            let state = this.state
            this.props.loadposttask(state)
        })
    }

    Buy = (e) =>{
        if(this.props.postTask!='Please login')
        this.setState({ type: 'Buy', pageid:this.props.match.params.id},()=>{
            let state = this.state
            this.props.loadposttask(state)
        })
    }

    approve= (e) =>{
        this.setState({ type: 'approve', pageid:this.props.match.params.id},()=>{
            let state = this.state
            this.props.loadposttask(state)
        })
    }

    success(result){
        this.setState=({type:''})
        Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${result}`,
                    showConfirmButton: false,
                    timer: 1500
                })
    }

    error = (result) =>{
        this.setState=({type:''})
         Swal.fire({
                    icon: 'error',
                    title: `${result}`,
                    showConfirmButton: true,
                })
    }

    render() {
        if(this.props.spost.title && this.state.loading == true && this.props.spost._id == this.props.match.params.id){  
            console.log(this.sprops)         
            this.setState({
                data: this.props.spost, loading: false
            })
        }
        const postres = this.props.postTask 
        return (
            <div>
                {postres== "post added to watch later"?
                this.success(postres) : postres== "bid sent"? this.success(postres) : postres== "item has been ordered successfully"? this.success(postres) : null }
                {postres== "value must be greater than current bid"?
                this.error(postres) : postres== "you can't bid on your own post | or use only valid numbers"? this.error(postres) : postres== "item sold out!"? this.error(postres) : postres== "You must be logged in to do this"? this.error(postres): postres== "Please login"? this.error(postres):null }
                <br />
                <Container>
                    {this.props.user === undefined ? null : this.props.user.admin === true ?
                        <Row>
                            <Col><Button onClick={this.delete} floated='left' color='red'>Delete Post</Button></Col>
                            <Col><Button floated='right' color='orange'>Close Post</Button></Col>
                        </Row> : null}

                    <br /><br />
                </Container>
                <Container>
                    <h3>
                    <Link style={{ color: '#2185D0' }} to={"/profile/" + this.state.data.user} title="Go to Seller Profile"><strong>By:</strong> {this.state.data.username}</Link></h3>
                </Container>
                <br />
                {this.props.spostLoading === true ? <div><Loader content='Loading' active inline='centered' /></div> : null}
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
                    {/* {this.props.postLoading === true ? <div><Loader content='Loading' active inline='centered' /></div> : null} */}
                </Container>
                {this.props.postTaskLoading === true ? <div><Loader content='sending action...' active inline='centered' /></div> : null}
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
                            </Container>
                        </Col>
                        <Col lg={3} md={4} sm={12}>
                            <Container style={{ margin: '0 auto', textAlign: 'center' }}>
                                <div class="ui vertical buttons">
                                    {this.props.user.admin===true?<Button onClick={this.approve} style={{ margin: '15px auto', width: '160px', color: 'black', display: 'block' }} color='green'>Approve post</Button>:null}

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
                                    {this.state.bidslength>2?
                                    <Segment>
                                        <a style={{color:'black'}} href={"/profile/" + this.state.data2[this.state.bidslength - 1].userid}>
                                        <h5> <strong>1: {this.state.data2[this.state.bidslength - 1].username}{"="}{this.state.data2[this.state.bidslength - 1].value}SAR</strong></h5></a>
                                        <a style={{color:'black'}} href={"/profile/" + this.state.data2[this.state.bidslength - 2].userid}>
                                        <h5> <strong>2: {this.state.data2[this.state.bidslength - 2].username}{"="}{this.state.data2[this.state.bidslength - 2].value}SAR</strong></h5></a>
                                        <a style={{color:'black'}} href={"/profile/" + this.state.data2[this.state.bidslength - 3].userid}>
                                        <h5> <strong>3: {this.state.data2[this.state.bidslength - 3].username}{"="}{this.state.data2[this.state.bidslength - 3].value}SAR</strong></h5></a>
                                        </Segment>:null}
                                    {this.state.bidslength==1?
                                <Segment>
                                    <a style={{color:'black'}} href={"/profile/" + this.state.data2[0].userid}>
                                    <h5> <strong>1: {this.state.data2[0].username}{"="}{this.state.data2[0].value}SAR</strong></h5></a>
                                    </Segment>: this.state.bidslength==2 ? <Segment>
                                        <a style={{color:'black'}} href={"/profile/" + this.state.data2[this.state.bidslength - 1].userid}>
                                        <h5> <strong>1: {this.state.data2[this.state.bidslength - 1].username}{"="}{this.state.data2[this.state.bidslength - 1].value}SAR</strong></h5></a>
                                        <a style={{color:'black'}} href={"/profile/" + this.state.data2[this.state.bidslength - 2].userid}>
                                        <h5> <strong>2: {this.state.data2[this.state.bidslength - 2].username}{"="}{this.state.data2[this.state.bidslength - 2].value}SAR</strong></h5></a>
                                        </Segment>:null}
                                    
                        <br/>
                        {this.state.bidloading? <div><Loader content='Loading' active inline='centered' />
                        <br/></div> : null}
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
                                <Comment.Avatar as='a' src={comment.user.profileimg==''? 'https://i.imgur.com/3KR0iMp.jpg' : comment.user.profileimg } />
                                <Comment.Content>
                                    <Comment.Author href={"/profile/" + comment.user._id}>{comment.username}</Comment.Author>
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
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}
const mapStateToProps = ({ spostLoading, spost, user, error, postTaskLoading, postTask,  }) => ({
    spostLoading,
    spost, 
    user,
    error,
    postTaskLoading,
    postTask
 });
 
 const mapDispatchToProps = dispatch => ({
   loadSpost: (pageid) => dispatch(loadSpost(pageid)),
   loadposttask: (pageid) => dispatch(loadposttask(pageid))
 })
   // bindActionCreators({ requestUserData }, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(PostReady);