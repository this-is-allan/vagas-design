import _ from 'lodash';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Table, Button, Checkbox, Card, Icon, Label } from 'semantic-ui-react'
import faker from 'faker';
import * as moment from 'moment';


class Dashboard extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    componentWillMount() {
        const { firestore } = this.context.store

        const userKey = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0];
        const isLogged = userKey ? true : false;

        if (!isLogged) {
            this.props.history.push({ pathname: '/' })
        }

        firestore.get({
            collection: 'jobs',
            orderBy: ['createdAt', 'desc']
        })
    }

    render() {
        const { jobs } = this.props;

        return (
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
                                    <Checkbox slider defaultChecked={job.status} />
                                </Table.Cell>
                                <Table.Cell>{job.title.substring(0, 60)}...</Table.Cell>
                                <Table.Cell>{moment(job.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
                                <Table.Cell>
                                    {job.remote ? <Label icon='globe' content='Remote' /> : ''}
                                    {job.presential ? <Label icon='anchor' content='Presential' /> : ''}
                                </Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <Button>Edit</Button>
                                    <Button>Delete</Button>
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
        )

        // return (
        //     <Grid>
        //         {_.map(jobs, job => {
        //             return (
        //                 <Grid.Column mobile={16} computer={4} key={job.id}>
        //                     <Card fluid>
        //                         <Card.Content>
        //                             <Card.Header>{job.title.substr(0, 40)}</Card.Header>
        //                             <Card.Meta>{moment(job.createdAt).toNow(true)}</Card.Meta>
        //                             <Card.Description>
        //                                 {job.remote ? <Label icon='globe' content='Remote' /> : ''}
        //                                 {job.presential ? <Label icon='anchor' content='Presential' /> : ''}
        //                             </Card.Description>
        //                         </Card.Content>
        //                     </Card>
        //                 </Grid.Column>
        //             );
        //         })}
        //     </Grid>
        // );

    }
}

export default connect((state) => ({
    jobs: state.firestore.ordered.jobs
}))(Dashboard)