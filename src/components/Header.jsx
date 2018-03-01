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
            <Image avatar src={props.photo} /> {props.name}
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
                    name='loginPage'
                    active={props.activeItem === 'loginPage'}
                    onClick={props.handleItemClick}
                    content='Sign in'
                />
            </Menu.Item>
        </Menu.Menu>
    )
}

// function LogoutButton(props) {
//     return (
//         <Menu.Menu position='right'>
//             <Menu.Item>
//                 <Button
//                     onClick={() => console.log(props.auth)}
//                     content='Logout'
//                 />
//             </Menu.Item>
//         </Menu.Menu>
//     )
// }

class Header extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    sair() {
        this.props.firebase.auth().signOut().then(function () {
            console.log('saiu da conta com sucesso!');
        }).catch(function (error) {
            console.log('Ocorreu um erro', error)
        });
    }

    logout() {
        console.log(this.props.auth());
    }

    render() {
        const { activeItem } = this.state;
        const { auth } = this.props;

        const options = [
            { key: 'user', text: 'Account', icon: 'user' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => this.logout() }
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
                    Create Job
                </Menu.Item>

                {isEmpty(auth) ? (
                    <LoginButton activeItem={activeItem} handleItemClick={this.handleItemClick} />
                ) : (
                        // <LogoutButton activeItem={activeItem} handleItemClick={this.handleItemClick} auth={auth} />
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Dropdown loading trigger={<MyProfile name={auth.displayName} photo={auth.photoURL} />} pointing='top' options={options} icon={null} />
                            </Menu.Item>

                            <Menu.Item
                                onClick={this.sair.bind(this)}
                            >
                                Sair
                        </Menu.Item>
                            {/* <Menu.Item>
                            <Button
                                onClick={(auth) => auth.firebase.logout()}
                                content='Logout'
                            />
                        </Menu.Item> */}
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



// export default withFirebase(Header);

// export default connect((state) => ({
//     auth: state.firebase.auth,
//     profile: state.firebase.profile
// }))(Header)