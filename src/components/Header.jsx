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
                <Link to='/'>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        href="/"
                        >
                        Home
                    </Menu.Item>
                </Link>

                <Link to='/jobs/new'>
                    <Menu.Item
                        name='jobsNew'
                        active={activeItem === 'jobsNew'}
                        onClick={this.handleItemClick}
                        href="/jobs/new"
                    >
                        Create Job
                    </Menu.Item>
                </Link>
            </Menu>
        );
    }
}