import axios from 'axios';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ErrorMessage from './ErrorMessage';


export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMsg, setError] = useState(null);
    let errorComponent = <ErrorMessage errorMsg={errorMsg}></ErrorMessage>

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    return (
        <div>
            <h3>Input Name and Password</h3>
            <h5>Username:</h5>
            <input value={userData.username} onChange={(e) => {
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username: username
                })
            }}/>
            <h5>Password:</h5>
            <input value={userData.password} onChange={(e) => {
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password: password
                })
            }} type='password' />          
            <button
                onClick={() => {
                    axios.post('/api/users/authenticate', userData)
                        .then(response => {
                            dispatch({
                                type:'LOGIN',
                                username: response.data.username,
                            })
                            navigate('/')
                            // console.log(response)
                            // console.log(response.data.username)
                        })
                        .catch(error => setError(error.response.data));
                }}
            >Log In</button>
            <div>{errorComponent}</div>
        </div>
    );


} 