import React, { Component } from 'react';
import faker from 'faker';
import { Image, Button, Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux';

function MyProfile(props) {
    return (
        <span>
            <Image avatar src={props.photo} />
        </span>
    )
}

function LoginButton(props) {
    return (
        <Menu.Menu position='right'>
            <Menu.Item>
                <Button
                    color="pink"
                    as={Link}
                    to='/login'
                    name='signUp'
                    active={props.activeItem === 'signUp'}
                    onClick={props.handleItemClick}
                    content='Sign up'
                />
            </Menu.Item>
        </Menu.Menu>
    )
}

class Header extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logout() {
        console.log(this.props.firebase.auth().signOut());
    }

    render() {
        const { activeItem } = this.state;
        const { auth } = this.props;

        const options = [
            { key: 'user', text: 'Account', icon: 'user' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: this.logout.bind(this) }
        ]

        return (
            <Menu size='large'>
                <Menu.Item
                    as={Link}
                    to='/'
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    Home
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    to='/jobs/new'
                    name='jobsNew'
                    active={activeItem === 'jobsNew'}
                    onClick={this.handleItemClick}
                >
                    Create a Job
                </Menu.Item>

                {isEmpty(auth) ? (
                    <LoginButton activeItem={activeItem} handleItemClick={this.handleItemClick} />
                ) : (
                        // <LogoutButton activeItem={activeItem} handleItemClick={this.handleItemClick} auth={auth} />
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Dropdown loading trigger={<MyProfile photo={auth.photoURL} />} pointing='top' options={options} icon={null} />
                            </Menu.Item>
                        </Menu.Menu>
                    )}
            </Menu>
        )
    }
}


export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth } }) => ({ auth }))
)(Header)