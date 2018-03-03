import React, { Component } from 'react'
import { Message, Divider, Grid, Button, Icon, Form, Input } from 'semantic-ui-react';
import { withFirebase, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import faker from 'faker';
import { Link, withRouter } from 'react-router-dom';

class LoginPage extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    login() {
        const login = this.props.firebase.login({
            provider: "google",
            provider: "facebook",
            type: "popup"
        })

        if (login) {
            this.props.history.push({ pathname: '/' })
        }
    }

    onSubmit(values) {
        const credentials = ({
            email: values.email,
            password: values.password
        });

        this.props.firebase.createUser(credentials)
        .then(() => {
            this.props.history.push({ pathname: '/' })
        }).catch((error) => {
            console.log('error', error)
        });
    }

    renderField(field) {
        const { meta: { touched, error } } = field;

        return (
            <div>
                <Form.Field
                    label={field.label}
                    type={field.type}
                    minLength={field.minLength}
                    placeholder={field.placeholder}
                    control={field.control}
                    error={touched ? error : false}
                    {...field.input}
                />
                <p>{error}</p>
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <Grid centered>
                <Grid.Column width={5}>
                    <Button fluid color='google plus' onClick={this.login.bind(this)}>
                        <Icon name='google plus' /> Google
                        </Button>

                    <Button fluid color='facebook' onClick={this.login.bind(this)} style={{ marginTop: '6px' }}>
                        <Icon name='facebook' /> Facebook
                        </Button>

                    <Divider horizontal>Or</Divider>

                    <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="Email"
                            name="email"
                            type="email"
                            placeholder={`e.g., ${faker.internet.exampleEmail()}`}
                            control={Input}
                            component={this.renderField}
                        />
                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            minLength={6}
                            control={Input}
                            component={this.renderField}
                        />
                        <Field
                            label="Password Confirmation"
                            name="password_confirmation"
                            type="password"
                            control={Input}
                            component={this.renderField}
                        />

                        <Button fluid type='submit'>Sign in</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = true;
    }

    if (!values.password || values.password.length < 6) {
        errors.password = true;
    }

    if (!values.password_confirmation || values.password_confirmation.length < 6) {
        errors.password_confirmation = true;
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'UsersNewForm'
})(
    withFirebase(LoginPage),
    withRouter(LoginPage)
)