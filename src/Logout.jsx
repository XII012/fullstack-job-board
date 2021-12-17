import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';


export default function Logout(props) {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (<Button onClick={() => axios.post('/api/users/logout')
    .then(() => {
      dispatch({
        type: 'LOGOUT',
      })
      navigate('/')
    })
    .catch(console.error)
  }>Logout</Button>);
}