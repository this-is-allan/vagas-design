import _ from 'lodash';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Card, Icon } from 'semantic-ui-react'

class JobsIndex extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    componentWillMount() {
        const { firestore } = this.context.store
        firestore.get('jobs')
    }

    render() {
        const { jobs } = this.props;
        
        return (
            <Grid>
            {_.map(jobs, job => {
                return (
                    <Grid.Column mobile={16} computer={4} key={job.id}>
                        <Card fluid>
                            <Card.Content header={job.title} />
                            <Card.Content description={job.description} />
                            <Card.Content extra>
                                <Icon name='user' />
                                4 Friends
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
}))(JobsIndex)