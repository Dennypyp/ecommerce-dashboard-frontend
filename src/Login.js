import Header from "./Header";
import React, {useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    useEffect(()=> {
        if(localStorage.getItem('user-info')) {
            nav('/');
        }
    },[]);

    async function login() {
        let item = {  email, password };
        console.warn(item);
        let result = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "content-type": 'application/json',
                "Accept": "application/json"
            }
        })

        result = await result.json();
        console.warn("result", result);
        localStorage.setItem("user-info", JSON.stringify(result));
        nav("/");
    }

    return(
        <>
        <Header />
        <div className="col-sm-6 offset-sm-3">
                <h1 className='text-center'>Login</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className='text-left'>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label className='text-left'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={login}>Login</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login;