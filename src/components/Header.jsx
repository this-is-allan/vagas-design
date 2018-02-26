import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
        const { activeItem } = this.state

        return (
            <Menu>
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

                <Menu.Item
                    as={Link}
                    to='/login'
                    name='loginPage'
                    active={activeItem === 'loginPage'}
                    onClick={this.handleItemClick}
                >
                    Login
                </Menu.Item>
            </Menu>
        );
    }
}