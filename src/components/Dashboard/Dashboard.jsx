import _ from 'lodash';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Confirm, Table, Button, Checkbox, Icon, Label } from 'semantic-ui-react'
import * as moment from 'moment';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'


class Dashboard extends Component {
    state = { jobId: '', open: false }

    static contextTypes = {
        store: PropTypes.object.isRequired
    }
    
    componentWillMount() {
        const userKey = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0];
        const isLogged = userKey ? true : false;
        
        if (!isLogged) {
            this.props.history.push({ pathname: '/' })
        }
    }
    
    confirmDelete = (id) => this.setState({ jobId: id, open: true })

    handleCancel = () => this.setState({ open: false })

    handleConfirm = () => {
        const { firestore } = this.context.store;
        firestore.delete({ collection: 'jobs', doc: this.state.jobId })
        this.setState({ jobId: '', open: false })
    }
    
    render() {
        const { jobs } = this.props;
        return (
            <div>
                <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    size='tiny'
                />

                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Created at</Table.HeaderCell>
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {_.map(jobs, job => {
                            return (
                                <Table.Row key={job.id}>
                                    <Table.Cell collapsing>
                                        <Checkbox slider checked={job.status} />
                                    </Table.Cell>
                                    <Table.Cell>{job.title.substring(0, 60)}...</Table.Cell>
                                    <Table.Cell>{moment(job.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
                                    <Table.Cell>
                                        {job.remote ? <Label color='green' icon='globe' content='Remote' /> : ''}
                                        {job.presential ? <Label color='blue' icon='anchor' content='Presential' /> : ''}
                                    </Table.Cell>
                                    <Table.Cell textAlign='center'>
                                        <Button>Edit</Button>
                                        <Button onClick={this.confirmDelete.bind(this, job.id)}>Delete</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='4'>
                                <Button floated='right' icon labelPosition='left' primary size='small'>
                                    <Icon name='user' /> Add User
                                </Button>
                                <Button size='small'>Approve</Button>
                                <Button disabled size='small'>Approve All</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}

export default compose(
    firestoreConnect([{ collection: 'jobs', orderBy: ['createdAt', 'desc'] }]),
    connect((state, props) => ({
        jobs: state.firestore.ordered.jobs
    }))
)(Dashboard)