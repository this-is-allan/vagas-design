import _ from 'lodash';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Card, Icon, Label } from 'semantic-ui-react'
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
            orderBy: ['createdAt', 'desc'],
            where: ['status', '==', true]
        })
    }

    render() {
        const { jobs } = this.props;

        return (
            <Grid>
                {_.map(jobs, job => {
                    return (
                        <Grid.Column mobile={16} computer={4} key={job.id}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{job.title.substr(0, 40)}</Card.Header>
                                    <Card.Meta>{moment(job.createdAt).toNow(true)}</Card.Meta>
                                    <Card.Description>
                                        {job.remote ? <Label icon='globe' content='Remote' /> : ''}
                                        {job.presential ? <Label icon='anchor' content='Presential' /> : ''}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    );
                })}
            </Grid>
        );

    }
}

export default connect((state) => ({
    jobs: state.firestore.ordered.jobs
}))(Dashboard)