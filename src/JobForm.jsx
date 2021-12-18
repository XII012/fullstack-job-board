import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';


export default function JobUpdate(props) {
    const navigate = useNavigate();

    const [jobForm, setJobForm] = useState({
        jobTitle: props.jobTitle,
        companyName: props.companyName,
        location: props.location,
        description: props.description,
        employerEmail: props.employerEmail,
        companyWebsite: props.companyWebsite,
    })

    axios.defaults.withCredentials = true;
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
                        onChange={(e) => setJobForm({
                            ...jobForm,
                            // jobTitle: e.target.value
                        })}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Company Name"  
                        onChange={(e) => setJobForm({
                            ...jobForm,
                            companyName: e.target.value
                        })}/>
                    </Form.Group>
                </Col>
               
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Job Location:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" 
                        onChange={(e) => setJobForm({
                            ...jobForm,
                            location: e.target.value
                        })}/>
                    </Form.Group>
                </Col>
                
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" 
                        onChange={(e) => setJobForm({
                            ...jobForm,
                            description: e.target.value
                        })}/>
                    </Form.Group>
                </Col>
                
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Job Employer Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"  
                        onChange={(e) => setJobForm({
                            ...jobForm,
                            employerEmail: e.target.value
                        })}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Company Website</Form.Label>
                        <Form.Control type="text" placeholder="Enter website"  
                        onChange={(e) => setJobForm({
                            ...jobForm,
                            companyWebsite: e.target.value
                        })}/>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )

    return (
        <div>
            {jobComponent}
        </div>
    )
}