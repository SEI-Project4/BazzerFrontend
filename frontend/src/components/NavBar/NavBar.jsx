import React, { Component } from 'react'
import { Menu, Icon, Button, Dropdown } from 'semantic-ui-react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'


export default class NavBar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
                                    name='locations'
                                    active={activeItem === 'locations'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item 
                                name='categories'
                                style={{ marginBottom: '2px' }}
                                >
                                    <Dropdown id="dropdown-categ"
                                    onClick={this.handleItemClick}
                                    active={activeItem === 'categories'} 
                                        text='Categories'
                                        floating
                                        labeled
                                    >
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/categories">Pets</Dropdown.Item>
                                            <Dropdown.Item>Cars</Dropdown.Item>
                                            <Dropdown.Item>Electronics</Dropdown.Item>
                                            <Dropdown.Item>Food</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </Menu.Item>
                                <Menu.Menu position='right'>
                                    {localStorage.usertoken?
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
                                            <Dropdown.Header icon='user' content='Ali hdd' />
                                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                            <Dropdown.Item>Inbox</Dropdown.Item>
                                            <Dropdown.Item>Request verification</Dropdown.Item>
                                            <Dropdown.Item>Log-out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </Menu.Item>: <Menu.Item style={{ marginRight: '-15px' }}>
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
