import React, { Component } from 'react'
import { Menu, Icon, Button, Dropdown } from 'semantic-ui-react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import jwt from 'jsonwebtoken'


export default class NavBar extends Component {
    state = {
        session: false,
        token: '',
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
                console.log("decoded dot user navbar")
                console.log(decoded.user);
                self.setState({ token: decoded.user, session: true })
            }
        });

    }
    componentDidUpdate=()=>{
        console.log("navbar state:=")
        console.log(this.state)
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
                                    name='locations'
                                >
                                    <Dropdown id="dropdown-categ"
                                        onClick={this.handleItemClick}
                                        active={activeItem === 'locations'}
                                        text='Locations'
                                        floating
                                        labeled
                                        search
                                    >
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/locations">Qassim</Dropdown.Item>
                                            <Dropdown.Item>Riyadh</Dropdown.Item>
                                            <Dropdown.Item>Tabuk</Dropdown.Item>
                                            <Dropdown.Item>Madinah</Dropdown.Item>
                                            <Dropdown.Item>Makkah</Dropdown.Item>
                                            <Dropdown.Item>Jawf</Dropdown.Item>
                                            <Dropdown.Item>Ha'il</Dropdown.Item>
                                            <Dropdown.Item>Bahah</Dropdown.Item>
                                            <Dropdown.Item>Jizan</Dropdown.Item>
                                            <Dropdown.Item>'Asir</Dropdown.Item>
                                            <Dropdown.Item>Najran</Dropdown.Item>
                                            <Dropdown.Item>Eastern Province</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Item>
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
                                        search
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
                                                    <Dropdown.Header icon='user' content={this.state.token.username} />
                                                    <Dropdown.Item href={"/users/" + `${this.state.token._id}`}>Profile</Dropdown.Item>
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
