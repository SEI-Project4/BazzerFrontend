import React, { Component } from 'react'
import jwt from 'jsonwebtoken'
import './HomePage.css'
import { Button, Card, Icon, Loader } from 'semantic-ui-react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Approve extends Component {

    state = {
        token: "",
        advanced: false,
        data: [],
        search: '',
        loading: true,
        cities :[],
    }

    componentDidMount() {
        console.log("hshdhsjhd")
        if (localStorage.usertoken) {
            console.log('user token');

            var decoded = jwt.verify(localStorage.usertoken, 'secret')
            
            this.setState({ token: decoded })
            console.log("here")
            console.log(decoded)
        } else { }

        axios.get('https://sei-bazaar-backend.herokuapp.com/posts')
            .then((res) => {
                this.setState({
                    data: res.data.result, loading: false
                })
            })
            .catch(err => console.log(err))

            console.log(this.state)
    }

    render() {
        return (
            <div style={{marginBottom: '70vh'}}>
                {this.state.loading?<div><br/><br/><br/><Loader content='Loading' active inline='centered' /></div>:null}

                {this.props.user.admin===true?
                <Container style={{marginTop:'20%'}}>
                <div className="ui four column doubling stackable grid center aligned container">
                    {this.state.data.map((post)=>{
                         return post.isapproved == false ? 
                             
                             <a style={{ textDecoration: 'none' }} href={`/post/${post._id}`}>
                                 <div class="column">
                            <Card style={{ margin: '0 auto' }} class="ui segment">

                                <img style={{ maxHeight: '250px' }} src={post.postimages == null ? null : post.postimages[0]}
                                    label={{
                                        as: 'a',
                                        color: 'black',
                                        content: `${33}`,
                                        icon: 'eye',
                                        ribbon: true,
                                    }} />
                                <Card.Content>
                <Card.Header>{post.title}</Card.Header>

                                    <Card.Description>
                                        {post.description.substring(0, 54) + "..."}
                                    </Card.Description>
                                    <Card.Meta style={{ fontWeight: 'bold', marginTop: '7px', textAlign: 'center' }}>
                                         {post.views}<Icon name="eye"></Icon>

                                    </Card.Meta>
                                    <Card.Meta style={{ fontWeight: 'bold', marginTop: '12px', textAlign: 'center' }}>
                                        {post.price > 0 ? <span>Price {post.price}</span> : <span>starting bid {post.startingbid}</span>}
                                        <Card.Meta style={{color:'red'}}>
                                            Pending approval
                                            <Button color='green' style={{marginLeft:'20px'}}>Approve</Button>
                                        </Card.Meta>

                                    </Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                <Link to={"/profile/" + post.user}  title="profile">
                                        <Icon name='user' />
                                        {post.username}
                                </Link>
                                    
                                </Card.Content>
                            </Card>
                            </div>
                        </a>:null
                        

                        

                         
                    })}
                    </div>
                </Container>
            :null}
                

            </div>
        )
    }
}

const mapStateToProps = ({ isLoading, user, error}) => ({
    isLoading,
    user,
    error,
 });

 export default connect(mapStateToProps)(Approve);