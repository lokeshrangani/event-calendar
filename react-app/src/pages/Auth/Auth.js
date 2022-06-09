import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../redux/Auth/action';
import { useNavigate } from "react-router-dom";
import './style.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, response, error } = useSelector(state => state.AuthReducer);
    const emailInput = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('Login');
    const [btnText, setBtnText] = useState('Register');
    const [variant, setVariant] = useState('');
    const [alertText, setAlertText] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const INVALID_EMAIL = 'Please Enter Valid Email';
    const INVALID_FIRST_NAME = 'The first name must be at least 2 characters';
    const INVALID_LAST_NAME = 'The last name must be at least 2 characters';
    const INVALID_PASSWORD = 'The password must be at least 4 characters';

    const token = localStorage.getItem('omnifyAccessToken') || '';

    useEffect(() => {
        /* Check If User Logged In or not */
        if (token.length > 0) navigate('/schedule');
    }, [])

    /* Close Alert */
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsOpen(!isOpen);
                setVariant('');
                setAlertText('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen])

    useEffect(() => {
        /* Set Access Token in Local storage */
        if (Object.keys(response).length > 0) {
            if (response.success) {
                localStorage.setItem('omnifyAccessToken', response.token);
                response.token && window.location.reload();
            } else {
                var errorText = response?.message
                setAlertText(errorText);
                setVariant('danger');
                setIsOpen(true);
            }
        }
    }, [response])

    useEffect(() => {
        /* Display error */
        if (Object.keys(error).length > 0) {
            var errorText = error?.data?.message || error.response.data.error.email[0]
            setAlertText(errorText);
            setVariant('danger');
            setIsOpen(true);
        }
    }, [error])

    /* Validate Request Data */
    const validation = () => {
        var isValid = true;
        if (type === 'Register') {
            if ([null, '', undefined].includes(fName) || [null, '', undefined].includes(lName)) {
                isValid = false;
            }
            if (fName.length < 2) {
                isValid = false;
                setAlertText(INVALID_FIRST_NAME);
            }
            if (lName.length < 2) {
                isValid = false;
                setAlertText(INVALID_LAST_NAME);
            }
            if ([null, '', undefined].includes(password) || password.length < 4) {
                isValid = false;
                setAlertText(INVALID_PASSWORD);
            }
        }

        if ([null, '', undefined].includes(email) || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
            isValid = false;
            setAlertText(INVALID_EMAIL);
            emailInput.current.focus();
        }

        if ([null, '', undefined].includes(password)) {
            isValid = false;
            setAlertText(INVALID_PASSWORD);
        }

        if (!isValid) {
            setIsOpen(true);
            setVariant('danger');
        }
        return isValid;
    }

    /* Handle Submit */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validation();
        if (isValid) {
            var request = {
                "email": email,
                "password": password
            };
            if (type === 'Register') {
                request.first_name = fName;
                request.last_name = lName;
                await dispatch(register(request));
            } else {
                await dispatch(login(request));
            }
        }
    }

    return (
        <div className='center'>
            <Container className='border'>
                <h1>{type}</h1><hr />
                <Alert variant={variant} show={isOpen}>
                    {alertText}
                </Alert>
                <Form onSubmit={handleSubmit}>
                    {
                        type === 'Register' && (
                            <>
                                <Form.Group className="mb-3" size="lg">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={fName}
                                        onChange={(e) => setFName(e.target.value)}
                                        autoComplete='off'
                                        disabled={loading}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {INVALID_FIRST_NAME}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" size="lg">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value={lName}
                                        onChange={(e) => setLName(e.target.value)}
                                        autoComplete='off'
                                        disabled={loading}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {INVALID_LAST_NAME}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </>
                        )
                    }

                    <Form.Group className="mb-3" size="lg">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            className={alertText === INVALID_EMAIL && 'invalid-input'}
                            placeholder="Enter email"
                            value={email}
                            ref={emailInput}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                            disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                            {INVALID_EMAIL}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" size="lg">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            className={alertText === INVALID_PASSWORD && 'invalid-input'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='off'
                            disabled={loading}
                        />
                    </Form.Group><hr />
                    <Button
                        variant="primary"
                        type="submit"
                        size='sm'
                        disabled={loading}
                    >
                        Submit {loading && <Spinner animation="border" size="sm" />}
                    </Button> {" "}
                    <Button
                        variant="secondary"
                        type="button"
                        size='sm'
                        onClick={() => {
                            var current = (type === 'Register' ? 'Login' : 'Register');
                            setType(current);
                            setBtnText(type);
                        }}
                        disabled={loading}
                    >
                        {btnText}
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login;