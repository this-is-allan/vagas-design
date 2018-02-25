export const FETCH_JOBS = 'fetch_jobs';

export function fetchJobs() {
    // base.get('jobs', {
    //     context: this,
    //     withIds: true
    // }).then(items => {
    // }).catch(err => {

    // });
    
    const jobs = {};
    
    return {
        type: FETCH_JOBS,
        payload: jobs
    }
}