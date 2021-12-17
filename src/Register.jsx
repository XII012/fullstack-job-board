import axios from 'axios';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ErrorMessage from './ErrorMessage';


export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        password: '',
        passwordVerification: '',
        username: '',
    })
    const [errorMsg, setError] = useState(null);
    let errorComponent = <ErrorMessage errorMsg={errorMsg}></ErrorMessage>

  function onRegisterButtonClick() {
    
    if (userData.password !== userData.passwordVerification) {
      setError("Your password and password verification don't match.");
      return;
    }

    axios.post('/api/users', userData)
    .then(response => {
        dispatch({
            type:'LOGIN',
            username: response.data.username,
        })
        navigate('/')
        // console.log(response)
        // console.log(response.data.username)
    })
    .catch(error => {
        console.log(error)
        setError("Username already exists.")
    });
  }

    const [loggedInName, setLoggedInName] = useState('');

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
            <h5>Password Verification:</h5>
            <input value={userData.passwordVerification} onChange={(e) => {
                const passwordVerification = e.target.value;
                setUserData({
                    ...userData,
                    passwordVerification: passwordVerification
                })
            }} type='passwordVerification' />
            <button onClick={onRegisterButtonClick}>Register</button>
            {/* <button
                onClick={() => {
                    axios.post('/api/users/logout')
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => console.log(error));
                }}
            >Log Out</button> */}
            {/* <button
                onClick={
                    () => {
                        axios.get('/api/users/whoIsLoggedIn')
                            .then(response => setLoggedInName(response.data))
                            .catch(error => console.log(error));
                    }
                }
                >Who is logged in?</button> */}
            {loggedInName && <div>{loggedInName}</div>}
            <div>{errorComponent}</div>
        </div>
    );


} 