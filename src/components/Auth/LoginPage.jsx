import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase'

class LoginPage extends Component {
    
    login() {
        const provider = new this.props.firebase.auth.FacebookAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then(function(result) {
            console.log(result);
        }).catch(function(error) {
            console.log(error);
        });
    }
    
    isLogged() {
        this.props.firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(true);
                console.log(user);
            } else {
                console.log(false);
            }
        });
    }

    logout() {
        this.props.firebase.auth().signOut().then(function() {
            console.log('saiu da conta com sucesso!');
        }).catch(function(error) {
            console.log('Ocorreu um erro', error)
        });
    }
    
    render() {
        return (
            <p>
                <Button color='facebook' onClick={this.login.bind(this)}>
                    <Icon name='facebook' /> Facebook
                </Button>
                <Button onClick={this.isLogged.bind(this)}>
                    I'm logged?
                </Button>
                <Button color="red" onClick={this.logout.bind(this)}>
                    Logout
                </Button>
            </p>
        );
    }
}

// LoginPage.propTypes = {
//     firebase: PropTypes.shape({
//         login: PropTypes.func.isRequired
//     }),
//     auth: PropTypes.object
// }

export default withFirebase(LoginPage);