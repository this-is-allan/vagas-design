import React from 'react';
import JobsIndex from './Jobs/JobsIndex';
import { Image, Statistic } from 'semantic-ui-react'

const Home = () => (
    <div>
        <h1>Welcome to the freela.design</h1>
        
        <JobsIndex />
    </div>
)

export default Home;