import React, { Component } from 'react'
import jwt from 'jsonwebtoken'
import './HomePage.css'
import { Button, Divider, Input, Segment, Card, Icon, Image, Dropdown, Checkbox, Loader, Pagination } from 'semantic-ui-react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadUser, setUser } from "../../actions";

const locations = [
    { key: 1, text: 'Jeddah', value: 'Jeddah' }, { key: 2, text: 'Makkah', value: 'Makkah' }, { key: 3, text: 'Abha', value: 'Abha' }, { key: 4, text: 'Medina', value: 'Medina' }, { key: 5, text: 'Tabuk', value: 'Tabuk' }, { key: 6, text: 'Sakaka', value: 'Sakaka' }, { key: 7, text: 'Hail', value: 'Hail' }, { key: 8, text: 'Buraydah', value: 'Buraydah' }, { key: 9, text: 'Riyadh', value: 'Riyadh' }, { key: 10, text: 'Dammam', value: 'Dammam' }, { key: 11, text: 'Taif', value: 'Taif' }
]


class HomePage extends Component {
    state = {
        token: "",
        advanced: false,
        data: [],
        search: '',
        loading: true,
        cities :[],
    }

    componentDidMount() {
        this.props.loadUser()
        if (localStorage.usertoken == true) {
            console.log('user token');

            var decoded = jwt.verify(localStorage.usertoken, 'secret')
            console.log(decoded.user);
            this.setState({ token: decoded })
        } else { }

        axios.get('https://sei-bazaar-backend.herokuapp.com/posts')
            .then((res) => {
                this.setState({
                    data: res.data.result, loading: false
                })
            })
            .catch(err => console.log(err))
    }

    filterCity =(e,{value})=>{
        this.setState({
            cities : value
        })
    }

    checkbox = () => {
        if (this.state.advanced == false) {
            this.setState({ advanced: true })
        } else { this.setState({ advanced: false }) }
    }
    searchOnChange = (e) => {
        this.setState({ search: e.target.value.toLowerCase() })
    }
    render() {

        const lowercasedsearch = this.state.search.toLowerCase();
        const filteredItems = this.state.data.filter((item) => item.title.toLowerCase().includes(this.state.search));
        console.log(filteredItems)
        return (
            <div>
                <Container>
                    <br />
                    <Segment basic textAlign='center'>
                        {this.state.advanced ?
                            <div>
                                <Dropdown
                                    style={{ marginBottom: '12px', marginRight: '10px' }}
                                    placeholder='City'
                                    // fluid
                                    multiple
                                    search
                                    selection
                                    options={locations}
                                    onChange={this.filterCity.bind(this)}
                                />
                                <Dropdown
                                    placeholder='Categorie'
                                    // fluid
                                    multiple
                                    search
                                    selection
                                    options={locations}
                                    onChange={this.filterCity.bind(this)}
                                />
                                <br />
                            </div>
                            : null}
                        <Input

                            action={{ color: 'blue', content: 'Search' }}
                            icon='search'
                            iconPosition='left'
                            placeholder='Search for something'
                            type='name'
                            name='search'
                            onChange={this.searchOnChange}
                        />
                        {/* <br/><div style={{marginBottom:'10px'}}></div> */}
                        <Checkbox style={{ marginLeft: '10px' }} onClick={this.checkbox} label="Advanced" />

                        <Divider horizontal>Or</Divider>

                        <Button
                            color='teal'
                            content='Sell Anything'
                            icon='add'
                            labelPosition='left'
                            href="/create"
                        />
                    </Segment>
                    <br />
                    {this.state.loading === true ? <div><Loader content='Loading Please Wait' active inline='centered' /></div> : null}
                </Container>
                <br /><br />
                <div className="ui four column doubling stackable grid center aligned container">
                
                {this.state.cities.length==0?
                filteredItems.map((post) => {
                    return post.isapproved===true?
                        <div class="column">
                    <a style={{ textDecoration: 'none' }} href={`/post/${post._id}`}>
                    <Card style={{ margin: '0 auto', minHeight: '450px' }} class="ui segment">

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

                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a style={{ textDecoration: 'none' }} href={"/profile/" + post.user}>
                                <Icon name='user' />
                                {post.username}
                            </a>
                        </Card.Content>
                    </Card>
                </a>
                        
                    </div>
                :null}):filteredItems.map((post) => {
                    return post.isapproved===true?<a style={{ textDecoration: 'none' }} href={`/post/${post._id}`}>
                        {this.state.cities.map((city)=>{
                            return post.city==city? <div class="column">
                                
                            <Card style={{ margin: '0 auto', minHeight: '450px' }} class="ui segment">

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

                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <a style={{ textDecoration: 'none' }} href={"/profile/" + post.user}>
                                    <Icon name='user' />
                                    {post.username}
                                </a>
                            </Card.Content>
                        </Card></div>:null}
                        )}
                        
                            
                        </a>
                    
                :null})}
                    
                    <br />

                </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                {/* <div style={{ textAlign: 'center' }}>
                    <Pagination defaultActivePage={1}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        totalPages={5} />
                </div> */}
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}
const mapStateToProps = ({ isLoading, user, error }) => ({
    isLoading,
    user,
    error, 
 });
 
 const mapDispatchToProps = dispatch => ({
   loadUser: () => dispatch(loadUser()),
 })
   // bindActionCreators({ requestUserData }, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(HomePage);