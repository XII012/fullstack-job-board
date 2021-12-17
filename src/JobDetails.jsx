import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';


export default function JobDetails() {
    const jobId = useParams().jobId;
    const navigate = useNavigate();
    const username = useSelector(state=>state.username);
    let editDeleteButtons='';
    const [job, setJob] = useState(null);
    useEffect(findJobDetails, []);

    function findJobDetails() {
        axios.get('http://localhost:8000/api/job/findById/' + jobId)
            .then(response => setJob(response.data))
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

    let favoriteButton = (username) ? (<Button onClick={favoriteJob}>{(!favorite)?("Favorite"):("Unfavorite")}</Button>) : (<div></div>);

    function checkFavorite() {
        axios.get('http://localhost:8000/api/users/favorites', {withCredentials:true})
            .then((response) =>{
                // console.log(response)
                if (response.data.includes(jobId)) {
                    // console.log("true")
                    setFavorite(true);
                }
            })
            .catch(error=>console.log(error))
    }
    
    useEffect(checkFavorite, []);

    function favoriteJob() {
        axios.put('http://localhost:8000/api/users/favorite/' + jobId, {withCredentials:true})
            .then(response => {

                console.log(response.data)
            })
            .catch(error => console.log("Could not find Job"));
    }


    const jobComponent = job ? 
        (<>
        <div>
            Job Poster: {job.poster}
        </div>
        <div>
            Job Title: {job.jobTitle}
        </div>
        <div>
            Company Name: {job.companyName}
        </div>
        <div>
            Job Location: {job.location}
        </div>
        <div>
            Job Description: {job.description}
        </div>
        <div>
            Job Employer Email: {job.employerEmail}
        </div>
        <div>
            Company Website: {job.companyWebsite} 
        </div>
        <div>
            Post Date: {job.postDate}
        </div>
        <div>
            {favoriteButton}
        </div>
        <div>{
        editDeleteButtons= (username === job.poster) ? (
            <div>
                <Link to={`/jobUpdate/${jobId}`}>
                    <Button>Edit</Button>
                </Link>
                <Button onClick={deleteJob}>Delete</Button>
            </div>
        ):(<div></div>)
        }</div>

        </>) :
        (<div> No Job found </div>);

    return (
        <div>
            {jobComponent}
        </div>
    )
}