// import React from 'react'
// import { Card, Icon } from 'semantic-ui-react'

// const description = [
//     'Amy is a violinist with 2 years experience in the wedding industry.',
//     'She enjoys the outdoors and currently resides in upstate New York.',
// ].join(' ')

// const JobsIndex = () => (
//     <Card>
//         <Card.Content header='About Amy' />
//         <Card.Content description={description} />
//         <Card.Content extra>
//             <Icon name='user' />
//             4 Friends
//     </Card.Content>
//     </Card>
// )

// export default JobsIndex

import _ from 'lodash';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Icon } from 'semantic-ui-react'

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
        
        return _.map(jobs, job => {
            return (
                <Card key={job.id}>
                    <Card.Content header={job.title} />
                    <Card.Content description={job.description} />
                    <Card.Content extra>
                        <Icon name='user' />
                        4 Friends
                    </Card.Content>
                </Card>
            );
        });
    }
}

export default connect((state) => ({
    jobs: state.firestore.ordered.jobs
}))(JobsIndex)