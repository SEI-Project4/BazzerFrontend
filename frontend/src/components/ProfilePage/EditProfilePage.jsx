import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import {Button,Checkbox,Form,Input,Radio,Select,TextArea} from 'semantic-ui-react'
import './ProfilePage.css'
import Dropzone from 'react-dropzone'

const imageMaxSize = 2132600 // bytes = 2MB
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

const options = [
    { text: 'Abhur', value: 'Abhur' },
    { text: 'Al-Andalus', value: 'Al-Andalus' },
    { text: 'Al-Naseem', value: 'Al-Naseem' },
  ]

export default class ProfilePage extends Component {

    state = {
        allImages: []
    }
    handleChange = (e, { value }) => this.setState({ value })
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
                    var joined = this.state.allImages.concat(myResult);
                    this.setState({ allImages: joined })
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
                <Container style={{ border: 'dashed 2px black', backgroundColor: 'white', width:'430px',borderRadius:'20px', padding:'0'}}>
                <div style={{borderRadius:'40px'}}>
                {this.state.allImages.length <= 4 ?
                    <div>
                        <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypesArray} multiple={false} maxSize={imageMaxSize}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div style={{textAlign:'center'}} {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <br/><br/><br/><br/><br/><br/><br/>
                                        <h1 >Drag 'n' drop your images here, or Click to browse</h1>
                                        <br/>
                                        <h5>Maximum 5 images each no bigger than 2MB</h5>
                                        <br/><br/><br/><br/><br/><br/>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div> : null}
                {this.state.allImages.map((img) => {
                    return <img style={{display:'block', margin:'15px auto'}} width="300px" height="250px" src={img} />
                })}
                {console.log("ssssss")}
                {console.log(this.state.allImages)}
                {console.log("image 64")}
            </div>
                </Container>

                <Container>
                <br/><br/><br/>
                <Form>
        <Form.Group>
          <Form.Field width={6}
            control={Input}
            label='Title'
            placeholder='Enter post title'
          />
          <Form.Field width={6}/>
          <Form.Field width={4}
            control={Select}
            label='Location'
            options={options}
            placeholder='Choose the closest location'
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
            <Input focus placeholder='Enter a price...' />
          </div>:null}
          {this.state.value == 2 ? <div>
            <Input focus placeholder='Enter a starting bid...' />
          </div>:null}
        </Form.Group>
        <Form.Field style={{ minHeight: 200 }}
          control={TextArea}
          label='Description'
          placeholder='Give your post a description..'
        />
        <Form.Field
          control={Checkbox}
          label='I agree to the Terms and Conditions'
        />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
                </Container>
                
            </div>
        )
    }
}
