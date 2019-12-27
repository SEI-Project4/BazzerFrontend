import React, { Component } from 'react'
import { Menu, Icon, Button, Dropdown } from 'semantic-ui-react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { connect } from "react-redux";
import { loadUser } from "../../actions";

class NavBar extends Component {
    state = {
        session: false,
        token: '',
        user:'',
        loading:true,
        userdata:[]
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logout = () => {
        localStorage.removeItem("usertoken");
        window.location.replace("/home");
    }

    componentDidMount = () => {
        this.props.loadUser()

        let self = this;

        jwt.verify(localStorage.usertoken, 'secret', function (err, decoded) {
            if (err) {
                self.setState({ session: false })
            } else {
                var decoded = jwt.verify(localStorage.usertoken, 'secret')
                self.setState({ session: true,token: decoded })
            }
        });
    }
    
    render() {
       if(this.props.user.firstname && this.state.loading){
           this.setState({userdata:this.props.user, loading:false})
           
       }else if(this.props.error=='session expired'){
        //    alert("session expired please login again")
        //    this.setState({session:false})
       }
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
                                            <Dropdown.Item>How to use</Dropdown.Item>
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
                                                {this.state.userdata.firstname?
                                                <Dropdown.Menu>
                                                    <Dropdown.Header icon='user' content={this.state.userdata.tokenuser} />
                                                    <Dropdown.Item href={"/profile/" + `${this.state.userdata.id}`}>Profile</Dropdown.Item>
                                                    <Dropdown.Item href={"/profile/" + `${this.state.userdata.id}`}>Inbox</Dropdown.Item>
                                                    {this.state.userdata.admin === true ?
                                                    <Dropdown.Item href="/approve"><strong>Approve posts</strong></Dropdown.Item>:null}
                                                    <Dropdown.Item>Request verification</Dropdown.Item>
                                                    <Dropdown.Item onClick={this.logout}>Log-out</Dropdown.Item>
                                                </Dropdown.Menu>:<Dropdown.Menu>
                                                <Dropdown.Header icon='user' content=' Loading...' />
                                                    </Dropdown.Menu>}
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
const mapStateToProps = ({ isLoading, user, error }) => ({
    isLoading,
    user,
    error, 
 });

 const mapDispatchToProps = dispatch => ({
    loadUser: (pageid) => dispatch(loadUser(pageid)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
