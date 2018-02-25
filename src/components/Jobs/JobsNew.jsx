import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Form, TextArea, Input } from 'semantic-ui-react'
import { createJob } from './../../actions';
import { Link } from 'react-router-dom';

class JobsNew extends Component {
    render() {
        return (
            <Form>
                <Form.Field name='title' control={Input} label='Title' placeholder='Title' />
                <Form.Field name='description' control={TextArea} label='Description' placeholder='Tell us more about the job...' />
                <Form.Field name='status' control={Checkbox} label='Public' defaultChecked />
                <Button type='submit'>Create Job</Button>
            </Form>
        );
    }
}

export default JobsNew;