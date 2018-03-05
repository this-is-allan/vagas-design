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
        firestore.add('jobs', values)
    }

    renderField(field) {
        return (
            <Form.Field
                label={field.label}
                placeholder={field.placeholder}
                control={field.control}
                defaultChecked={field.default}
                {...field.input}
            />
        );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    placeholder="Title"
                    control={Input}
                    component={this.renderField}
                    />
                <Field
                    label="Description"
                    name="description"
                    placeholder="Tell us more about the job..."
                    control={TextArea}
                    component={this.renderField}
                />
                <Field
                    label="Public"
                    name="status"
                    control={Checkbox}
                    default={true}
                    component={this.renderField}
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

// export default connect(null)(JobsNew)
// export default connect((state) => ({
    // jobs: state.firestore.ordered.jobs
// }))(JobsNew)