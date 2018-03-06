import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Form, TextArea, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form';


class JobsNew extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    onSubmit(values) {
        const { firestore } = this.context.store;
        const { title, description, remote, presential } = values;
        const status = false;
        const createdAt = firestore.FieldValue.serverTimestamp();

        firestore.add(
            { collection: 'jobs' },
            { title, description, remote, presential, status, createdAt }
        )
    }

    renderField(field) {
        return (
            <Form.Field
                id={field.id}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                control={field.control}
                {...field.input}
                value={field.value}
            />
        );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    id="title"
                    label="Title"
                    name="title"
                    placeholder="Title"
                    control={Input}
                    component={this.renderField}
                    />
                <Field
                    id="description"
                    label="Description"
                    name="description"
                    placeholder="Tell us more about the job..."
                    control={TextArea}
                    component={this.renderField}
                />
                <Field
                    label="Remote"
                    name="remote"
                    id="remote"
                    control={Checkbox}
                    component={this.renderField}
                    value="remote"
                />
                <Field
                    label="Presential"
                    name="presential"
                    id="presential"
                    control={Checkbox}
                    component={this.renderField}
                    value="presential"
                />
                <Button type='submit'>Create Job</Button>
            </Form>
        );
    }
}


export default reduxForm({
    form: 'JobsNewForm'
})(
    connect(null)(JobsNew)
);