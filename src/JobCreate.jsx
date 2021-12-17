import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ErrorMessage from './ErrorMessage';


export default function JobCreate() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMessage] = useState('');
    let errorComponent = <ErrorMessage errorMsg={errorMsg}></ErrorMessage>
    
    function createJob() {

        axios.post('http://localhost:8000/api/job/create', jobForm, {withCredentials: true})
            .then(response => {
                console.log(response.data)
                navigate(`/jobDetails/${response.data._id}`)
            })
            .catch(error => setErrorMessage(error.response.data));
    }

    const [jobForm, setJobForm] = useState({
        jobTitle:'',
        companyName:'',
        location:'',
        description:'',
        employerEmail:'',
        companyWebsite:'',
    })

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
                            jobTitle: e.target.value
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
            <Button onClick={createJob}>Submit</Button>
            {errorComponent}
        </div>
    )
}