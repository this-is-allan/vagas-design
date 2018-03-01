import React, { Component } from 'react'
import { Divider, Grid, Button, Icon, Form } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase'
import faker from 'faker';

class LoginPage extends Component {
    
    login() {
        this.props.firebase.login({
            provider: "google",
            provider: "facebook",
            type: "popup"
        })
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
            <Grid centered>
                <Grid.Column width={5}>
                        <Button fluid color='google plus' onClick={this.login.bind(this)}>
                            <Icon name='google plus' /> Google
                        </Button>

                        <Button fluid color='facebook' onClick={this.login.bind(this)} style={{marginTop: '6px'}}>
                            <Icon name='facebook' /> Facebook
                        </Button>

                        <Divider horizontal>Or</Divider>

                        <Form>
                            <Form.Field>
                                <label>Email</label>
                                <input placeholder={`e.g., ${faker.internet.exampleEmail()}`} />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input />
                            </Form.Field>
                            <Form.Field>
                                <label>Password Confirmation</label>
                                <input />
                            </Form.Field>
                            <Button fluid type='submit'>Enter</Button>
                        </Form>
                    </Grid.Column>
            </Grid>
        )
    }
}

export default withFirebase(LoginPage);