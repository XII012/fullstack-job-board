
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Form, FormControl, Button, Row, Col, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JobSimple from './JobSimple';
import { useSelector } from 'react-redux';


export default function JobSearch() {
  const [allJobId, setAllJobId] = useState([]);
  const [allJob, setAllJob] = useState([]);


  axios.defaults.withCredentials = true;

  function findAllJobId() {
      axios.get('http://localhost:8000/api/users/favorites')
          .then(response => {
            setAllJobId(response.data)
            // console.log(allJobId)
          })
          .catch(error => console.error(error));
  }

  function findAllJob() {
    axios.get('http://localhost:8000/api/job/findByIds',{
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
