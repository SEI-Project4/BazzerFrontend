import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Loader, Icon } from 'semantic-ui-react'
import './PostStyle.css'
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadPost } from "../../actions";

const imageMaxSize = 2132600 // bytes = 2MB
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

const options = [
  { text: 'Jeddah', value: 'Jeddah' },
  { text: 'Makkah', value: 'Makkah' },
  { text: 'Abha', value: 'Abha' },
  { text: 'Medina', value: 'Medina' },
  { text: 'Tabuk', value: 'Tabuk' },
  { text: 'Sakaka', value: 'Sakaka' },
  { text: 'Hail', value: 'Hail' },
  { text: 'Buraydah', value: 'Buraydah' },
  { text: 'Riyadh', value: 'Riyadh' },
  { text: 'Dammam', value: 'Dammam' },
  { text: 'Taif', value: 'Taif' },
]

class CreatePost extends Component {
  state = {
    postimages: [],
    city: '',
    price: '',
    startingbid: '',
    city: '',
    value: 0,
    check: false,
    title: '',
    session: true,
    submited:false,
    type: "create",
  }

  componentDidMount = () => {
    
  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  check = (e) => {
    if (this.state.check == false) {
      this.setState({ check: true })
    } else { this.setState({ check: false }) }
  }
  changeLocation = (e, { value }) => {
    this.setState({
      city: value
    })
    console.log(this.state.city)
  }

  submit = (e) => {
    const state = this.state
    console.log(state)
    e.preventDefault()
    if (this.state.session == false) {
      alert("Your session has expired please login again")
    } else if (this.state.value == 0) {
      alert("please choose a price or starting bid")
    } else if (this.state.value == 1 && this.state.price == '') {
      alert("please set a price")
    } else if (this.state.value == 2 && this.state.startingbid == '') {
      alert("please set a starting bid")
    }
    else if(this.state.postimages.length<1){
      alert("you need to provide atleast 1 image")
    }
    else if (this.state.check == false) {
      alert("please accept the terms and conditions")
    } else if (this.state.title == '') {
      alert("you need to state a title")
    } else {this.props.loadPost(state)}
  }
  handleChange = (e, { value }) => {
    this.setState({ value })
    console.log(this.state)
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
    console.log(files)
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
          var joined = this.state.postimages.concat(myResult);
          this.setState({ postimages: joined })
        }, false)
        myFileItemReader.readAsDataURL(currentFile)
      }
    }
  }

  render() {

    const { value } = this.state
    return (
      <div>
        <br />
        {this.state.postimages.length <= 4 ?
          <Container style={{ border: 'dashed 2px black', backgroundColor: 'white', width: '430px', borderRadius: '10px', padding: '0' }}>
            <div style={{ borderRadius: '10px' }}>

              <div>
                <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypesArray} multiple={false} maxSize={imageMaxSize}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div style={{ textAlign: 'center' }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <br /><br /><br /><br /><br />
                        
                        <br />
                        <h1 >Drag 'n' drop your images here, or Click to browse</h1>
                        <br />
                        <h5>Maximum 5 images each no bigger than 2MB</h5>
                        <br />
                        <h1><Icon name="upload"></Icon></h1>
                        <br /><br /><br /><br /><br />
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
          </Container> : null}
        <br />
        <div className="ui three column doubling stackable grid center aligned container">
          {this.state.postimages.map((img) => {
            return <img style={{ display: 'block', margin: '15px auto' }} width="300px" height="250px" src={img} />
          })}
        </div>
        <Container>
          <br/>
          {this.props.postLoading===true?<div><Loader content='Loading' active inline='centered' /></div>:null}
          {this.props.post==="Post has been created"?<div>{
          Swal.fire({
            icon: 'success',
            title: 'Post has been created, Please wait for admin approval'
          })}{window.location.replace("/home")}</div>:null}
        
          <br /><br /><br />
          <Form onSubmit={this.submit} method="POST">
            <Form.Group>
              <Form.Field width={6}
                control={Input}
                label='Title'
                placeholder='Enter post title'
                onChange={this.onChange}
                type="name" name="title"
              />
              <Form.Field width={6} />
              <Form.Field width={4}
                control={Select}
                label='Location'
                options={options}
                placeholder='Closest location'
                onChange={this.changeLocation}
                type="name" name="city"
              />
            </Form.Group>
            <Form.Group inline>
              <label>Choose an option</label>
              <Form.Field
                control={Radio}
                label='Set a price'
                value='1'
                checked={value === '1'}
                onChange={this.handleChange}
              />
              <Form.Field
                control={Radio}
                label='Start a bid'
                value='2'
                checked={value === '2'}
                onChange={this.handleChange}
              />
              {this.state.value == 1 ? <div>
                <Input focus placeholder='Enter a price in SAR'
                  onChange={this.onChange}
                  type="number" name="price" />
              </div> : null}
              {this.state.value == 2 ? <div>
                <Input focus placeholder='Enter a starting bid in SAR'
                  onChange={this.onChange}
                  type="number" name="startingbid" />
              </div> : null}
            </Form.Group>
            <Form.Field width={3}
              control={Input}
              label='Quantity'
              placeholder='set a quantity..'
              onChange={this.onChange}
              type="number" name="quantity"
            />
            <Form.Field style={{ minHeight: 200 }}
              control={TextArea}
              label='Description'
              placeholder='Give your post a description..'
              onChange={this.onChange}
              type="name" name="description"
            />
            
            <Form.Field
              control={Checkbox}
              label='I agree to the Terms and Conditions'
              onChange={this.check}
            />
            <Form.Field type="submit" control={Button}>Submit</Form.Field>
          </Form>
        </Container>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    )
  }
}
const mapStateToProps = ({ postLoading, post, errorpost, user }) => ({
  postLoading,
  post,
  errorpost, 
  user,
});

const mapDispatchToProps = dispatch => ({
 loadPost: (pageid) => dispatch(loadPost(pageid)),
})
 // bindActionCreators({ requestUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);