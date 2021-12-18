
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Form, FormControl, Button, Row, Col, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JobSimple from './JobSimple';


export default function JobSearch() {
  const jobTitle = useParams().jobTitle;
  const [formInput, setFormInput] = useState(jobTitle);
  const [allJob, setAllJob] = useState([]);


  function findAllJob() {
      axios.get('/api/job/findByTitle/' + jobTitle)
          .then(response => {
              setAllJob(response.data)
          })
          .catch(error => console.error(error));
  }

  useEffect(findAllJob, [jobTitle]);

  const jobListComponent = allJob.map(job => {
    //   console.log(job._id)
      return (

      <JobSimple companyName = {job.companyName} jobId = {job._id}
                jobTitle = {job.jobTitle} location = {job.location}/>
      )
  })
  
    return (
      <><Container fluid>
        <Form>
            <Row className="align-items-center">
                <Col >
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
      </Container>
      <Container fluid>
        <Row className="align-items-center">
            {/* <Col xs="auto">{jobListComponent}</Col> */}
            {jobListComponent}
        </Row>
      </Container>
      
      
      </>
   
    );
}
