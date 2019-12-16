import React, { Component } from 'react'
import jwt from 'jsonwebtoken'
import { Row, Col, Button, Container, Tabs, Tab, OverlayTrigger, Popover, Form, Modal, Card } from 'react-bootstrap'
import './ProfilePage.css'
import { Item, Rating, Icon, Image } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

const imageMaxSize = 2132600 // bytes = 2MB
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

export default class ProfilePage extends Component {
    state={
        token:"",
        setshow: false,
        profileimg: null,
        firstname: null,
        lastname:null,
        description:null,
        city:null,
    }
    componentDidMount(){
        
        if (localStorage.usertoken) {
            console.log('user token');
            
                  var decoded = jwt.verify(localStorage.usertoken, 'secret')
                  console.log("decoded dot user")
                  console.log(decoded.user);
                  this.setState({ token: decoded, })
                  axios.get(`https://sei-bazaar-backend.herokuapp.com/users/${decoded.user._id}`).then(res=>{
                      this.setState({
                        firstname:res.data.result.firstname, lastname:res.data.result.lastname, description:res.data.result.description, profileimg:res.data.result.profileimg, city:res.data.result.city
                      })
                      console.log("shahsbahs")
                      console.log(res)
                  })
                  .catch(err=>console.log(err))
                } else { }
    }

    // componentDidMount(){
    //     if (localStorage.usertoken) {
    //         console.log('user token');
            
    //               var decoded = jwt.verify(localStorage.usertoken, 'secret')
    //               console.log(decoded.user);
    //               this.setState({ token: decoded })
    //               axios.get(`https://sei-bazaar-backend.herokuapp.com/users/${this.statetoken._id}`).then(res=>{

    //               }).catch(err=>console.log(err))
    //             } else { }
    // }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }
    submit = (e) => {
        axios.put(`https://sei-bazaar-backend.herokuapp.com/users/${this.state.token}`, this.state.profileimg)
            .then(res =>{
                
                console.log(res)})
        
            .catch(err => console.log(err))
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
                    this.setState({ profileimg: myResult })
                }, false)
                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }

    render() {
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
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <Icon name="edit outline"></Icon>Edit Profile
          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={4} md={12}>
                                <Card style={{ width: '18rem', margin: '0 auto' }}>
                                    <Card.Img variant="top" src={this.state.profileimg} />
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
                                <Form method="post" onSubmit={this.submit}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control name="city" placeholder="Jeddah.." onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control name="description" as="textarea" rows="3" onChange={this.onChange} />
                                    </Form.Group>
                                    <br/>
                                    <Button variant="success" type="submit">
                                        Submit </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                <br />
                <Container style={{ marginBottom: '-20px' }}>
                    <div style={{ marginLeft: '-15px' }}>
                        <Button onClick={() => this.setState({ setshow: true })} style={{ marginLeft: '0px', marginRight: '10px', width: '135px' }} inline-block variant="dark"><Icon name="edit outline"></Icon>Edit Profile</Button>
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
                            <Button style={{ float: 'right', marginRight: '-15px' }} inline-block variant="success"><Icon name="plus circle"></Icon>Rate User</Button>
                        </OverlayTrigger>
                    </div>
                </Container>
                <br />
                <Container style={{ border: 'solid 2px black', backgroundColor: 'white' }}>
                    <Row style={{ marginTop: '5%' }}>
                        <Col sm={4}><Image style={{ border: 'solid 1px gray', display: 'block', margin: 'auto' }} width="82%" height="auto" src="https://i.imgur.com/0hWpxv0.png" thumbnail />
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
                                <Button style={{ margin: '15px auto', width: '150px' }} block variant="primary"><Icon name="add user"></Icon> Follow</Button>
                                <br />
                                <Button style={{ margin: '15px auto', width: '150px' }} block variant="warning"><Icon name="envelope"></Icon>Message</Button>
                                <Button style={{ margin: '15px auto', width: '150px' }} block variant="warning"><Icon name="envelope"></Icon>Inbox</Button>
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
                        <Tab eventKey="following" title="Following">
                            <br />
                            <h1>Followings:</h1>
                            
                            <h1>Followers:</h1>
                        </Tab>
                        <Tab eventKey="watchlater" title="Watch list">
                            <br />
                            <h1>watch later</h1>
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
