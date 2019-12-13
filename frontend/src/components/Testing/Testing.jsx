import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
const imageMaxSize = 2132600 // bytes = 2MB
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })
export default class Testing extends Component {
    state = {
        allImages: []
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
                    var joined = this.state.allImages.concat(myResult);
                    this.setState({ allImages: joined })
                }, false)
                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }
    render() {
        return (
            <div>
                {this.state.allImages.length <= 2 ?
                    <div>
                        <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypesArray} multiple={false} maxSize={imageMaxSize}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div> : null}
                {this.state.allImages.map((img) => {
                    return <img width="300px" height="250px" src={img} />
                })}
                {console.log("ssssss")}
                {console.log(this.state.allImages)}
                {console.log("image 64")}
            </div>
        )
    }
}

