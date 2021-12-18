
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Container} from 'react-bootstrap';
import JobSimple from './JobSimple';


export default function JobSearch() {
  const [allJobId, setAllJobId] = useState([]);
  const [allJob, setAllJob] = useState([]);


  axios.defaults.withCredentials = true;

  function findAllJobId() {
      axios.get('/api/users/favorites')
          .then(response => {
            setAllJobId(response.data)
            console.log(allJobId)
          })
          .catch(error => console.error(error.response));
  }

  function findAllJob() {
    axios.get('/api/job/findByIds',{
            params: {
            jobIds: allJobId
            }
        })
        .then(response => {
            setAllJob(response.data)
        })
        .catch(error => console.log(error.response));
  }

  useEffect(findAllJobId, []);
  useEffect(findAllJob, [allJobId]);

  const jobListComponent = allJob.map(job => {
    // console.log(job._id)
    return (
    <JobSimple companyName = {job.companyName} jobId = {job._id}
              jobTitle = {job.jobTitle} location = {job.location}/>)
})
  
    return (      
    <Container fluid>
      <Row className="align-items-center">
          {/* <Col xs="auto">{jobListComponent}</Col> */}
          {jobListComponent}
      </Row>
    </Container>
      
    );
}
