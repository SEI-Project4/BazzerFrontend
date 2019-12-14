import React, { Component } from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
export default class NavBar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div style={{ backgroundColor: '#1B1C1D' }}>
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand id="nav-brandd" style={{ color: 'white', fontWeight: '600'}} href="#home"><Icon name='handshake outline' /> OPEN BAZAAR </Navbar.Brand> 
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav style={{ marginTop: '5px', marginBottom: '5px' }} className="mr-auto">
                            <Menu inverted pointing secondary id='menuu-navv'>
                                <Menu.Item style={{marginBottom:'2px'}}
                                    name='home'
                                    active={activeItem === 'home'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item style={{marginBottom:'2px'}}
                                    name='locations'
                                    active={activeItem === 'locations'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item style={{marginBottom:'2px'}}
                                    name='categories'
                                    active={activeItem === 'categories'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Menu position='right'>
                                <Menu.Item style={{marginRight:'-15px'}}>
                                    <Button  id="nav-signupp" primary>Sign up</Button>
                                </Menu.Item>

                                <Menu.Item>
                                    <Button  id="nav-signinn">Log-in</Button>
                                </Menu.Item>
                                </Menu.Menu>
                            </Menu>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
