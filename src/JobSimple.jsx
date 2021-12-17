import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function JobSimple(props) {
    const { jobTitle, companyName, location, jobId} = props;

    return (
    <div>
        <div>
            Job Title: {jobTitle}
        </div>
        <div>
            Job Name: {companyName}
        </div>
        <div>
            Job Name: {location}
        </div>
        <div>
            <Link to={`/jobDetails/${jobId}`}>
                <Button>detail</Button>
            </Link>
        </div>
    </div>
            
    )
}