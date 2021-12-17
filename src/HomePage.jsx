import { Form, FormControl, Button, Row, Col} from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function HomePage() {
    const [formInput, setFormInput] = useState('');

    return (
        <>
        <Form>
            <Row className="justify-content-md-center">
                <Col md="auto"><img src = "https://sheet2site.com/how-to-create-job-board/header.jpg" alt="JobBoard" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto"><h1>Kaiwen's Job Board</h1></Col>
            </Row>
            <Row className="align-items-center">
                <Col xs={5}></Col>
                <Col xs="auto">
                    <FormControl
                    type="search"
                    placeholder="Search jobs"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => {
                        setFormInput("/jobSearch/" + e.target.value);
                    }}
                    />
                </Col>
                <Col xs="auto">
                    <Link to={formInput}>
                        <Button 
                        variant="outline-success"
                        >Search</Button>
                    </Link>
                </Col>
            </Row>
        </Form>
            
        </>
    );
}