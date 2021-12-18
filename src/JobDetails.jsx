import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button,Card, Col, Row, Container, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';



export default function JobDetails() {
    const jobId = useParams().jobId;
    const navigate = useNavigate();
    const username = useSelector(state=>state.username);
    const [job, setJob] = useState(null);
    useEffect(findJobDetails, []);
    const dispatch = useDispatch();

    function updateJobDetail() {
        console.log(job)
        dispatch({
            type:'UPDATE',
            ...job
        })
    }
    if (job) {
        updateJobDetail();
    }

    function findJobDetails() {
        axios.get('http://localhost:8000/api/job/findById/' + jobId)
            .then(response => {
                console.log(response.data)
                setJob(response.data)
            })
            .catch(error => console.log("Could not find Job"));
    }

    function deleteJob() {
        axios.delete('http://localhost:8000/api/job/delete/' + jobId, {withCredentials:true})
            .then(response => {
                console.log(response)
                navigate('/')
            })
            .catch(error => console.log(error));
    }


    const [favorite, setFavorite] = useState(false);

    let favoriteButton = (username) ?
    (
        (!favorite) ?
            (<Button onClick={favoriteJob}>Favorite</Button>) :
            (<Button onClick={unfavoriteJob}>Unfavorite</Button>)
            )
     : (<Link to="/login"><Button>Favorite</Button></Link>
     );

    function checkFavorite() {
        axios.get('http://localhost:8000/api/users/favorites', {withCredentials:true})
            .then((response) =>{
                // console.log(response)
                if (response.data.includes(jobId)) {
                    setFavorite(true);
                }
            })
            .catch(error=>console.log(error))
    }
    
    useEffect(checkFavorite, [favorite]);

    axios.defaults.withCredentials = true;
    
    function favoriteJob() {
        axios.put('http://localhost:8000/api/users/favorite/' + jobId)
            .then(response => {
                setFavorite(true)
                console.log(favorite)
            })
            .catch(error => {
                setFavorite(true)
                console.log(error.response)
            });
    }


    function unfavoriteJob() {
        axios.put('http://localhost:8000/api/users/unfavorite/' + jobId)
            .then(response => {
                setFavorite(false)
                console.log(favorite)
            })
            .catch(error => {
                setFavorite(false)
                console.log(error.response)
            });
    }


    const jobComponent = job ? 
        (<>
        <Container>
            <Row sm={4}>
                <Col>
                    <Card>
                        <Card.Header>Job Title</Card.Header>
                        <Card.Body>
                            <Card.Text>{job.jobTitle}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Company Name</Card.Header>
                        <Card.Body>
                            <Card.Text>{job.companyName}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Job Location</Card.Header>
                        <Card.Body>
                            <Card.Text>{job.location}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row sm={4}>
                <Col>
                    <Card>
                        <Card.Header>Job Description</Card.Header>
                        <Card.Body>
                            <Card.Text>{job.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Job Employer Email</Card.Header>
                        <Card.Body>
                            <Card.Text><a href={`mailto:${job.employerEmail}`}>{job.employerEmail}</a></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Company Website</Card.Header>
                        <Card.Body>
                            <Card.Text>{job.companyWebsite}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Post Date</Card.Header>
                        <Card.Body>
                            <Card.Text>{job.postDate}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row xs="auto">
                <Col>{favoriteButton}</Col>
            </Row>
            <p></p>
            {(username === job.poster) ? (
                <Row xs="auto">

                    <Col>
                        <Link to={`/jobUpdate/${jobId}`}>
                            <Button>Edit</Button>
                        </Link>
                    </Col>
                    <Col>
                    <Button onClick={deleteJob}>Delete</Button>
                    </Col>
                </Row>   
            ):(<div></div>)
            }
            
        </Container>

        </>) :
        (<Alert variant='danger'> No Job found </Alert>);


    return (
        <div>{jobComponent}
            {/* {(!needEdit) ? (jobComponent) : 
            (
            <JobForm jobTitle = {job.jobTitle} companyName = {job.companyName} location = {job.location}
                description = {job.description} employerEmail = {job.employerEmail} companyWebsite = {job.companyWebsite}
            ></JobForm>)} */}
        </div>
    )
}