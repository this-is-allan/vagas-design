import React, { Component } from 'react';
import faker from 'faker';
import { Image, Button, Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function MyProfile(props) {
    return (
        <span>
            <Image avatar src={props.photo} /> {props.name}
        </span>
    )
}

const options = [
    { key: 'user', text: 'Account', icon: 'user' },
    { key: 'settings', text: 'Settings', icon: 'settings' },
    { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]

class Header extends Component {
    state = {}

    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
        const { activeItem } = this.state;
        const { profile } = this.props;
        const isLoggedIn = this.props.profile.isEmpty;

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
                    Create Job
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Dropdown loading trigger={<MyProfile name={profile.displayName} photo={profile.avatarUrl} />} pointing='top' options={options} icon={null} />
                    </Menu.Item>

                    <Menu.Item>
                        <Button
                            color="pink"
                            as={Link}
                            to='/login'
                            name='loginPage'
                            active={activeItem === 'loginPage'}
                            onClick={this.handleItemClick}
                            content='Sign in'
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default connect((state) => ({
    profile: state.firebase.profile
}))(Header)