import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';


export default function JobUpdate() {
    const navigate = useNavigate();
    const jobId = useParams().jobId;
    const job = useSelector(state=>state.job);
    const dispatch = useDispatch();

    axios.defaults.withCredentials = true;
    function updateJob() {

        axios.put(`/api/job/update/${jobId}`, job, {withCredentials: true})
            .then(response => {
                console.log(response.data)
                navigate(`/jobDetails/${jobId}`)
            })
            .catch(error => console.log(error.response));
    }


    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then((response) => console.log(response.data))
            .catch(() => navigate('/'))
    }

    useEffect(checkLogin, [])

    const jobComponent = (
        <Form>
            <Row className="mb-3">
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Job Title:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Job Title" 
                        onChange={(e) => dispatch({
                            type: 'UPDATE',
                            ...job,
                            jobTitle: e.target.value
                        })} value={job.jobTitle}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Company Name"  
                        onChange={(e) => dispatch({
                            type: 'UPDATE',
                            ...job,
                            companyName: e.target.value
                        })} value={job.companyName}/>
                    </Form.Group>
                </Col>
               
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Job Location:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" 
                        onChange={(e) => dispatch({
                            type: 'UPDATE',
                            ...job,
                            location: e.target.value
                        })} value={job.location}/>
                    </Form.Group>
                </Col>
                
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" 
                        onChange={(e) => dispatch({
                            type: 'UPDATE',
                            ...job,
                            description: e.target.value
                        })} value={job.description}/>
                    </Form.Group>
                </Col>
                
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Job Employer Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"  
                        onChange={(e) => dispatch({
                            type: 'UPDATE',
                            ...job,
                            employerEmail: e.target.value
                        })} value={job.employerEmail}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Company Website</Form.Label>
                        <Form.Control type="text" placeholder="Enter website"  
                        onChange={(e) => dispatch({
                            type: 'UPDATE',
                            ...job,
                            companyWebsite: e.target.value
                        })} value={job.companyWebsite}/>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )

    return (
        <div>
            {jobComponent}
            <Button onClick={updateJob}>Submit</Button>
        </div>
    )
}