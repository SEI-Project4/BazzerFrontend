import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

const imageMaxSize = 1066300 // bytes = 1MB
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })


export default class DropPic extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
