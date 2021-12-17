
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Form, FormControl, Button, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JobSimple from './JobSimple';


export default function JobSearch() {
  const jobTitle = useParams().jobTitle;
  const [formInput, setFormInput] = useState(jobTitle);
  const [allJob, setAllJob] = useState([]);


  function findAllJob() {
      axios.get('http://localhost:8000/api/job/findByTitle/' + jobTitle)
          .then(response => {
              setAllJob(response.data)
          })
          .catch(error => console.error(error));
  }

  useEffect(findAllJob, [jobTitle]);

  const jobListComponent = allJob.map(job => {
    //   console.log(job._id)
      return (<>
      <p></p>
      <JobSimple companyName = {job.companyName} jobId = {job._id}
                jobTitle = {job.jobTitle} location = {job.location}/>
      </>)
  })
  
    return (
      <>
      <Form>
          <Row className="align-items-center">
              <Col xs={5}></Col>
              <Col xs="auto">
                  <FormControl
                  type="search"
                  placeholder="Search jobs"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                      setFormInput(e.target.value);
                  }}
                  />
              </Col>
              <Col xs="auto">
                    <Link to={`/jobSearch/${formInput}`}>
                        <Button 
                        variant="outline-success"
                        >Search</Button>
                    </Link>

              </Col>
          </Row>
      </Form>
      <div>{jobListComponent}</div>
      
      </>
   
    );
}
