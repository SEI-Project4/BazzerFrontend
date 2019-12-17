import React, { Component } from 'react'
import { Menu, Icon, Button, Dropdown } from 'semantic-ui-react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import jwt from 'jsonwebtoken'
import axios from 'axios'


export default class NavBar extends Component {
    state = {
        session: false,
        token: '',
        user:'',
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logout = () => {
        localStorage.removeItem("usertoken");
        window.location.reload()
    }

    componentDidMount = () => {

        let self = this;

        jwt.verify(localStorage.usertoken, 'secret', function (err, decoded) {
            if (err) {
                self.setState({ session: false })
            } else {
                var decoded = jwt.verify(localStorage.usertoken, 'secret')
                self.setState({ session: true })
                console.log("response get user")
                axios.get(`https://sei-bazaar-backend.herokuapp.com/users/${decoded.id}`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
                    .then(res => {
                        self.setState({ user: res.data.result })
                        console.log(res.data.result)
                    }).catch(err => console.log(err))
            }
        });
    }
    componentDidUpdate = () => {
        // console.log("navbar state:=")
        // console.log(this.state)
    }



    render() {
        const { activeItem } = this.state

        return (
            <div style={{ backgroundColor: '#1B1C1D' }}>
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand id="nav-brandd" style={{ color: 'white', fontWeight: '600' }} href="/home"><Icon name='handshake outline' /> OPEN BAZAAR </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav style={{ marginTop: '5px', marginBottom: '5px' }} className="mr-auto">
                            <Menu inverted pointing secondary id='menuu-navv'>

                                <Menu.Item style={{ marginBottom: '2px' }}
                                    href="/home"
                                    name='home'
                                    active={activeItem === 'home'}
                                    onClick={this.handleItemClick}
                                />
                                 <Menu.Item style={{ marginBottom: '2px' }}
                                    href="/create"
                                    name='Sell'
                                    active={activeItem === 'create'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item
                                    name='About Us'
                                    style={{ marginBottom: '2px' }}
                                >
                                    <Dropdown id="dropdown-categ"
                                        onClick={this.handleItemClick}
                                        active={activeItem === 'categories'}
                                        text='About Us'
                                        floating
                                        labeled
                                        search
                                    >
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/terms">Terms and Conditions</Dropdown.Item>
                                            <Dropdown.Item>Contact information</Dropdown.Item>
                                            <Dropdown.Item>Electronics</Dropdown.Item>
                                            <Dropdown.Item>Food</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Item>
                                <Menu.Menu position='right'>
                                    {this.state.session ?
                                        <Menu.Item>
                                            <Dropdown
                                                text='My Account'
                                                icon='user circle'
                                                floating
                                                labeled
                                                button
                                                className='icon'
                                            >
                                                <Dropdown.Menu>
                                                    <Dropdown.Header icon='user' content={this.state.user.username} />
                                                    <Dropdown.Item href={"/profile/" + `${this.state.user._id}`}>Profile</Dropdown.Item>
                                                    <Dropdown.Item>Inbox</Dropdown.Item>
                                                    <Dropdown.Item>Request verification</Dropdown.Item>
                                                    <Dropdown.Item onClick={this.logout}>Log-out</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Menu.Item> : <Menu.Item style={{ marginRight: '-15px' }}>
                                            <Button href="/register" style={{ marginRight: '5px' }} id="nav-signupp" primary>Sign-up</Button>
                                            <Button href="/login" id="nav-signinn">Log-in</Button>
                                        </Menu.Item>
                                    }
                                </Menu.Menu>
                            </Menu>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
