import React, { Component } from 'react'
import jwt from 'jsonwebtoken'
import './HomePage.css'
import { Button, Divider, Input, Segment, Card, Icon, Image, Dropdown, Checkbox, Loader, Pagination } from 'semantic-ui-react'
import { Container } from 'react-bootstrap'
import Footer from '../Footer/Footer'
import axios from 'axios'

const locations = [
    { key: 1, text: 'Jeddah', value: 'Jeddah' }, { key: 2, text: 'Riyadh', value: 'Riyadh' }, { key: 3, text: 'Dammam', value: 'Dammam' }, { key: 4, text: 'Jizan', value: 'Jizan' }
]
const filterCity = (e, { value }) => {
    console.log(value)
}


export default class HomePage extends Component {
    state = {
        token: "",
        advanced: false,
        data: [],
        search: '',
        loading: true,
    }

    componentDidMount() {

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
        console.log("filtered items")
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
                                    onChange={filterCity.bind(this)}
                                />
                                <Dropdown
                                    placeholder='Categorie'
                                    // fluid
                                    multiple
                                    search
                                    selection
                                    options={locations}
                                    onChange={filterCity.bind(this)}
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

                    {filteredItems.map((post) => {
                        return <div class="column">
                            <a style={{ textDecoration: 'none' }} href={`/post/${post._id}`}>
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
                                        <Card.Meta style={{ fontWeight: 'bold', marginTop: '20px', textAlign: 'center' }}>
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
                    })}
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
                <br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}
