import React, { useState } from 'react';
import  { Form, Button } from 'react-bootstrap';
import logo from '../images/logo.png';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) { }

    return (
        <div className='Login'>
            <img src={logo} alt='Overbrook School of the Blind Logo' />

            <Form onSubmit={handleSubmit}>
                <Form.Group controlID='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        autoFocus 
                        type='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group controlID='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        autoFocus 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </Form.Group>

                <Button type='submit'>Login</Button>
            </Form>
        </div>
    )
}