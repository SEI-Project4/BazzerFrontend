import React, { Component } from 'react'
import jwt from 'jsonwebtoken'
import { Row, Col, Button, Container, Tabs, Tab, OverlayTrigger, Popover, Form, Modal, Card, Badge } from 'react-bootstrap'
import './ProfilePage.css'
import { Item, Rating, Icon, Image, Loader, Segment, Divider, Header } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Swal from 'sweetalert2'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadUser, loadusertask} from "../../actions";

const imageMaxSize = 1066300 // bytes = 1MB
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })
let sumrate = 0
let text = "noppooo"
class ProfilePage extends Component {
    
    state = {
        token: "",
        setshow: false,
        profileimg: null,
        firstname: '',
        lastname: '',
        description: null,
        city: null,
        guest: false,
        data: '',
        followers: [],
        loading: true,
        maxRating: 5,
        inboxShow: false,
        msg: "",
        userdata:[],
        type:'',
    }
    componentDidMount = () => {
        this.props.loadUser(this.props.match.params.id)
    
    }
    componentDidUpdate = () => {
        console.log("state is equal to")
        console.log(this.state)
        
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }
    submit = (e) => {
        this.setState({ type: 'submit' })
        if(this.state.type=='submit'){
            let state = this.state
            console.log(state)
            this.props.loadusertask(state)
            e.preventDefault()
        }
    }

    activeChat = (e) => {
        this.setState({
            msg: e.target.value
        })
        console.log(this.state)
    }
    chat = (e) => {
        this.setState({ type: 'chat', pageid:this.props.match.params.id})
        if(this.state.type=='chat'){
            let state = this.state
            console.log(state)
            this.props.loadusertask(state)
            e.preventDefault()
        }
    }
    verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + Math.ceil((currentFileSize / 1024) / 1024) + " MB is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }
    handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            this.verifyFile(rejectedFiles)
        }
        if (files && files.length > 0) {
            const isVerified = this.verifyFile(files)
            if (isVerified) {
                // imageBase64Data 
                const currentFile = files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener("load", () => {
                    console.log(myFileItemReader.result)
                    const myResult = myFileItemReader.result
                    // const myResult2 = new Buffer(myResult,'base64').toString('binary')
                    this.setState({ profileimg: myResult })
                }, false)
                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }

    follow = (e) => {
        this.setState({ type: 'follow', pageid:this.props.match.params.id})
        if(this.state.type=='follow'){
            let state = this.state
            console.log(state)
            this.props.loadusertask(state)
            e.preventDefault()
        }
    }

    rate = (e) => {
        this.setState({ type: 'rate', pageid:this.props.match.params.id})
        if(this.state.type=='rate'){
            let state = this.state
            console.log(state)
            this.props.loadusertask(state)
            e.preventDefault()
        }
    }

    handleRate = (e, { rating, maxRating }) => {
        this.setState({ star: rating })
    }
    rateOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    submitpass = (e) => {
        this.setState({ type: 'submitpass', pageid:this.props.match.params.id})
        if(this.state.type=='submitpass'){
            let state = this.state
            console.log(state)
            this.props.loadusertask(state)
            e.preventDefault()
        }
    }

    passwordOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    verifyuser = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/users/${this.props.match.params.id}/isverified`, this.state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
                console.log(res)
                if (res.data.msg == "isverified status changed") {
                    alert("user has been verified")
                }
            }).catch(err => {
                console.log(err)
            })
    }

    componentDidUpdate = () => {
        // console.log("update")
        axios.get(`http://localhost:5000/users/${this.props.match.params.id}/allmsg`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
                // console.log(res)
                this.setState({
                    allmsg: res.data.result
                })
            }).catch(err => console.log(err))
    }

    render() {
        if(this.props.user.firstname && this.state.loading == true){
            console.log(this.props)            
            const User = this.props.user
            this.setState({
                 description: User.description, profileimg: User.profileimg, city: User.city, loading: false, userdata:User, firstname:User.firstname, lastname:User.lastname
            })
        }else if(this.props.error=="session expired"){
            Swal.fire({
                icon: 'error',
                title: 'Session expired please Login again',
                showConfirmButton: true,
            })
            window.location.replace("/home")
            this.setState({ guest: true })
        }else{
            
        }
        return (
            <div>

                <Modal
                    size="lg"
                    show={this.state.setshow}
                    onHide={() => this.setState({ setshow: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    {this.state.userdata.id === this.props.match.params.id ? <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <Icon name="edit outline"></Icon>Edit Profile
          </Modal.Title>
                    </Modal.Header> : null}

                    <Modal.Body>
                        <Row>
                            <Col lg={4} md={12}>
                                <Card style={{ width: '18rem', margin: '0 auto' }}>
                                    <Card.Img variant="top" src={this.state.profileimg == "" ? "https://i.imgur.com/3KR0iMp.jpg" : this.state.profileimg} />
                                    <Card.Body>
                                        <Card.Text>
                                            Want to change your profile picture?</Card.Text>
                                        <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypesArray} multiple={false} maxSize={imageMaxSize}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <Button variant="dark">Change</Button>
                                                </div>
                                            )}
                                        </Dropzone>

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={8} md={12}>
                                <Form method="post" onSubmit={this.submitpass}>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Change password</Form.Label>
                                        <Form.Control placeholder="Current Password" name="password" type="password" rows="3" onChange={this.passwordOnChange} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">

                                        <Form.Control placeholder="New Password" name="newpassword" type="password" rows="3" onChange={this.passwordOnChange} />
                                    </Form.Group>
                                    <Button onClick={this.submitpass} variant="success" type="submit" variant="dark">Change</Button>
                                    <br />
                                    {this.props.userTaskLoading ? <div><Loader content='Loading' active inline='centered' /></div> : null}
                                    <br />
                                </Form>
                                <Form method="post" onSubmit={this.submit}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control value={this.state.city} name="city" placeholder="Jeddah.." onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control value={this.state.description} name="description" as="textarea" rows="3" onChange={this.onChange} />
                                    </Form.Group>
                                    <br />
                                    <Button onClick={this.submit} variant="success" type="submit">
                                        Save </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                <br />
                <Container style={{ marginBottom: '-20px' }}>
                    <div style={{ marginLeft: '-15px' }}>
                        {this.state.userdata.id === this.props.match.params.id ? <Button onClick={() => this.setState({ setshow: true })} style={{ marginLeft: '0px', marginRight: '10px', width: '135px' }} inline-block variant="dark"><Icon name="edit outline"></Icon>Edit Profile</Button> : null}
                        {this.state.userdata.id !== this.props.match.params.id ?
                            <OverlayTrigger trigger="click" placement="bottom" overlay={<Popover id="popover-basic">
                                <Popover.Title as="h3">Give a Rating</Popover.Title>
                                <Popover.Content>
                                    <Form method="post" onSubmit={this.rate}>
                                        <Rating onRate={this.handleRate} icon='star' maxRating={5} clearable />
                                        <Form.Control onChange={this.rateOnChange} type="text" name="review" style={{ margin: '5px auto' }} placeholder="Say something?" />
                                        <Button onClick={this.rate} size="sm" variant="primary" type="submit">
                                            Submit </Button>
                                    </Form>
                                </Popover.Content>
                            </Popover>}>

                                <Button style={{ float: 'right', marginRight: '-15px' }} inline-block variant="success"><Icon name="plus circle"></Icon>Rate User</Button>

                            </OverlayTrigger> : null}

                    </div>
                </Container>
                <br />
                <Container style={{ border: 'solid 2px black', backgroundColor: 'white' }}>
                    <Row style={{ marginTop: '5%' }}>
                        <Col sm={4}><Image style={{ border: 'solid 1px gray', display: 'block', margin: 'auto' }} width="82%" height="auto" src={this.state.profileimg == "" ? "https://i.imgur.com/3KR0iMp.jpg" : this.state.profileimg} thumbnail />
                            <h4 style={{ float: 'right', width: '90%', marginTop: '5px' }}>{this.state.userdata.username}</h4>{this.state.userdata.isadmin === true ? <div><Badge style={{ marginLeft: '35px' }} variant="danger">Admin</Badge></div> : null}</Col>
                        <Col sm={1}></Col>
                        <Col sm={6}>
                        {this.props.userTaskLoading ? <div><Loader content='Loading' active inline='centered' /></div> : null}
                            <Row>
                                <Container style={{ border: '1px gray solid', width: '100%', borderRadius: '5px', backgroundColor: '#f8f7f6' }}>
                                    <br />
                                    <h5>{this.state.firstname + " " + this.state.lastname}</h5>
                                    <h5>{this.state.city}</h5>

                                    {/* <h5 >Rating: {this.state.data.Rating!=undefined?
                                    this.state.data.Rating.length>0?this.state.data.Rating.map((rating)=>{
                                        return sumrate = rating.star + sumrate
                                        console.log(sumrate)
                                    }):null:null}</h5> */}


                                    <h5>Member since: {this.state.userdata.createdAt !== undefined ? this.state.userdata.createdAt.slice(0, -14) : null}</h5>
                                    <h5>{this.state.userdata.email}</h5>
                                    <h5>{this.state.userdata.phonenumber}</h5>
                                    <h5>Followers: {this.state.userdata.followers !== undefined ? this.state.userdata.followers.length : null}</h5>
                                    <br />
                                </Container>
                            </Row>
                            <Row>

                                <Modal
                                    size="md"
                                    show={this.state.inboxShow}
                                    onHide={() => this.setState({ inboxShow: false })}
                                    dialogClassName="modal-90w"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                >
                                    {<Modal.Header closeButton>
                                        <Modal.Title style={{ textAlign: 'center', width: '100%' }} id="contained-modal-title-vcenter">
                                            <Icon name="paper plane outline"></Icon>Messages</Modal.Title>
                                    </Modal.Header>}

                                    <Modal.Body>
                                        <Row>
                                            {/* <Col lg={1}></Col> */}
                                            <Col lg={12} md={12}>
                                                <Form method="post" onSubmit={this.chat}>
            {this.state.allmsg !== undefined ? this.state.allmsg.map((room) => {
                return room.user1 == this.state.userdata.id || room.user2 == this.state.userdata.id ? room.msg.map((chat) => {
                    return <div>
                            {chat.from !== this.state.userdata.id ?<Segment style={{marginBottom:'10px', textAlign:'right', backgroundColor:'#38EF7D'}}>{chat.content}{" :"}<a style={{color:'black'}} href={"/profile/"+chat.from}>{chat.from}</a></Segment>:<Segment style={{marginBottom:'10px', textAlign:'left',backgroundColor:'#edf0f0', color:'black'}}>{"You"}{": "}{chat.content}</Segment> }
                    </div>      
                }) : null
            }) : null}
                                                

                                                {this.state.userdata.id !== this.props.match.params.id ?
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Description</Form.Label>
                                                        <Form.Control name="msg" as="textarea" rows="3" onChange={this.activeChat} />
                                                        <br />
                                                    </Form.Group>:<h6 style={{textAlign:'center', marginTop:'30px'}}>This is your inbox. Click on a receiving Id and go to their profile to reply back</h6>}
                                                    {this.props.userTaskLoading ? <div><Loader content='Loading' active inline='centered' /></div> : null}
                                                    {this.state.userdata.id !== this.props.match.params.id ?
                                                    <Button style={{ margin: '0 auto', width: '35%', display: 'block' }} onClick={this.chat} variant="success" type="submit">
                                                        Send </Button>:null}
                                                </Form>
                                            </Col>
                                            {/* <Col lg={1}></Col> */}
                                        </Row>
                                    </Modal.Body>
                                </Modal>


                                <br />
                                {this.state.userdata.id === this.props.match.params.id ? <Button onClick={() => this.setState({ inboxShow: true })} style={{ margin: '15px auto', width: '150px' }} block variant="warning"><Icon name="envelope"></Icon>Inbox</Button> : this.state.userdata.id ? <div style={{ margin: '0 auto' }}><Button onClick={this.follow} style={{ margin: '15px auto', width: '150px' }} variant="primary"><Icon name="add user"></Icon> Follow</Button><div style={{ marginLeft: '50px', display: 'inline-block' }}></div>
                                    <Button onClick={() => this.setState({ inboxShow: true })} style={{ margin: '15px auto', width: '150px' }} variant="warning"><Icon name="envelope"></Icon>Message</Button></div>
                                    : null}
                            </Row>
                        </Col>
                        <Col sm={1}></Col>
                    </Row>
                    <br />
                    <Container>
                        <h4>Bio:</h4>
                        {this.state.loading === true ? <div><Loader content='Loading' active inline='centered' /></div> : null}
                        <p>{this.state.userdata.description}</p>
                    </Container>
                    <br /><br />
                    <Tabs defaultActiveKey="posts" id="uncontrolled-tab-example">
                        <Tab eventKey="posts" title="Posts">
                            <br />

                            <Item.Group>
                                {this.state.userdata.posts !== undefined ? this.state.userdata.posts.map((post) => {
                                    return <Item>
                                        <Item.Image size='tiny' src={post.postimages[0]} />

                                        <Item.Content>
                                            <Item.Header href={"/post/" + post._id} as='a'>{post.title}</Item.Header>
                                            <Item.Meta>{post.description}</Item.Meta>
                                            <Item.Description>
                                                comments({post.comments.length})
                                        </Item.Description>
                                            <Item.Extra>{post.createdAt.slice(0, -14)}</Item.Extra>
                                        </Item.Content>
                                    </Item>
                                }) : null}
                            </Item.Group>
                        </Tab>
                        {this.state.userdata.id === this.props.match.params.id ?
                            <Tab eventKey="orders" title="Previous Orders">
                                <br />
                                <Item.Group>
                                    {this.state.userdata.purchesedorder !== undefined ? this.state.userdata.purchesedorder.map((order) => {
                                        return <Item>
                                            <Item.Image size='tiny' src={order.postimages[0]} />
                                            
                                            <Item.Content>
                                                <Item.Header href={"/post/" + order._id} as='a'>{order.title}</Item.Header>
                                                <Item.Meta>{order.description}</Item.Meta>
                                                <Item.Description>
                                                    {/* comments({post.comments.length}) */}
                                                </Item.Description>
                                                <Item.Extra>{order.createdAt.slice(0, -14)}</Item.Extra>
                                            </Item.Content>
                                        </Item>
                                    }) : null}
                                </Item.Group>
                            </Tab> : null}
                        <Tab eventKey="ratings" title="Reviews">
                            <br />
                            {this.state.userdata.Rating !== undefined ? this.state.userdata.Rating.map((review) => {
                                return <div >
                                    <a style={{ color: 'black', textDecoration: 'none' }} href={"/profile/" + review.userid} >
                                        <h4>By:{" "}{review.username}</h4></a>
                                    <h5>{review.review}  {" "} <Rating icon='star' defaultRating={review.star} maxRating={5} disabled /></h5>
                                    <br />
                                </div>

                            }) : null}
                        </Tab>
                        {this.state.userdata.id === this.props.match.params.id ?
                            <Tab eventKey="following" title="Following">
                                <br />
                                <h2>Followings:</h2>
                                <br />
                                {this.state.userdata.following !== undefined ? this.state.userdata.following.map((user) => {
                                    return <Segment href={"/profile/" + user._id}>
                                        {user.username}
                                    </Segment>
                                }) : null}
                                <br />
                                <Divider horizontal>
                                    <Header as='h4'>

                                        ... </Header>
                                </Divider>
                                <h2>Followers:</h2>
                                <br />
                                {this.state.userdata.followers !== undefined ? this.state.userdata.followers.map((user) => {
                                    return <Segment href={"/profile/" + user._id}>
                                        {user.username}
                                    </Segment>
                                }) : null}
                            </Tab> : null}
                        {this.state.userdata.id === this.props.match.params.id ?
                            <Tab eventKey="watchlater" title="Watch list">
                                <br />

                                <Item.Group>
                                    {this.state.userdata.watchlater !== undefined ? this.state.userdata.watchlater.map((post) => {
                                        return <Item>
                                            <Item.Image size='tiny' src={post.postimages[0]} />

                                            <Item.Content>
                                                <Item.Header href={"/post/" + post._id} as='a'>{post.title}</Item.Header>
                                                <Item.Meta>{post.description}</Item.Meta>
                                                <Item.Description>
                                                    {/* comments({post.comments.length}) */}
                                                </Item.Description>
                                                {/* <Item.Extra>{post.createdAt.slice(0, -14)}</Item.Extra> */}
                                            </Item.Content>
                                        </Item>
                                    }) : null}
                                </Item.Group>
                            </Tab> : null}
                    </Tabs>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                </Container>
                <br />

                <br />
                {this.state.userdata.admin === true ? <Container>
                    <Row>
                        <Col>
                            <Button style={{ float: 'left', width: '150px', marginLeft: '30%' }} onClick={this.verifyuser} inline-block variant="success">Verify User</Button>
                        </Col>
                        <Col><Button style={{ float: 'right', width: '150px', marginRight: '30%' }} inline-block variant="danger">Delete User</Button></Col>
                    </Row>
                </Container> : null}
                <br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}
const mapStateToProps = ({ isLoading, user, error, userTaskLoading, userTask }) => ({
    isLoading,
    user,
    error,
    userTaskLoading,
    userTask
 });

 const mapDispatchToProps = dispatch => ({
   loadUser: (pageid) => dispatch(loadUser(pageid)),
   loadusertask: (pageid) => dispatch(loadusertask(pageid))
 })
   // bindActionCreators({ requestUserData }, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
