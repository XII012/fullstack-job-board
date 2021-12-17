import React, { useEffect, useState } from 'react';
import { Button, Card, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function JobSimple(props) {
    const { jobTitle, companyName, location, jobId} = props;


    return (
        <Col>
            <Card>
                {/* <Card.Header>Job Title</Card.Header> */}
                <Card.Body>
                    <Card.Title>jobTitle</Card.Title>
                    <Card.Text>{jobTitle}</Card.Text>
                    <Card.Title>companyName</Card.Title>
                    <Card.Text>{companyName}</Card.Text>
                    <Card.Title>location</Card.Title>
                    <Card.Text>{location}</Card.Text>
                </Card.Body>
                <Link to={`/jobDetails/${jobId}`}>
                    <Button>detail</Button>
                </Link>
            </Card>
        </Col>

            
    )
}