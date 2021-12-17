import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers/reducers';
import reportWebVitals from './reportWebVitals';
import Register from './Register';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Nav, Navbar, NavDropdown, Container, Button, Form, FormControl} from 'react-bootstrap';
import TopNavbar from './TopNavbar';
import HomePage from './HomePage';
import JobSearch from './JobSearch';
import JobDetails from './JobDetails';
import LogIn from './LogIn';
import JobCreate from './JobCreate';
import JobUpdate from './JobUpdate';
import Favorites from './Favorites';


const store = createStore(reducers);


ReactDOM.render(
  
  <Provider store={store} >
    <Router>
    <TopNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/jobSearch/:jobTitle" element={<JobSearch />} />
        <Route path="/jobSearch/" element={<JobSearch />} />
        <Route path="/jobCreate" element={<JobCreate />} />
        <Route path="/jobUpdate/:jobId" element={<JobUpdate />} />
        <Route path="/jobDetails/:jobId" element={<JobDetails />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
