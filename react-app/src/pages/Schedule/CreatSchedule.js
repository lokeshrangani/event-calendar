import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Form, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../redux/Event/action';
import { logout } from '../../redux/Auth/action';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import TimePicker from 'rc-time-picker';
import "rc-time-picker/assets/index.css";
import '../Auth/style.css';
import './style.css';

const CreatSchedule = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Days = [
        { label: "Monday", value: 1 },
        { label: "Tuesday", value: 2 },
        { label: "Wednesday", value: 3 },
        { label: "Thursday", value: 4 },
        { label: "Friday", value: 5 },
        { label: "Saturday", value: 6 },
        { label: "Sunday", value: 7 }
    ];

    const { loading, response, error } = useSelector(state => state.EventReducer);
    const nameInput = useRef(null);
    const description = useRef(null);
    const sTime = useRef(null);
    const eTime = useRef(null);
    const selectDay = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [variant, setVariant] = useState('');
    const [alertText, setAlertText] = useState('');
    const [endTame, setEndTame] = useState('');
    const [startTame, setStartTame] = useState('');
    const [selectedDay, setSelectedDay] = useState([]);
    const [invalidFields, setInvalidFields] = useState({});

    const INVALID_S_TIME = 'Please select Start Time';
    const INVALID_E_TIME = 'Please select End Time/ The end time must be a after start time' // The end time must be a after start time;
    const INVALID_DAY = 'Please select Day/s';
    const VIEW_EVENTS = 'View My schedules';
    const token = localStorage.getItem('omnifyAccessToken') || '';

    useEffect(() => {
        /* Check If User Logged In or not */
        if (token.length === 0) navigate('/');
        nameInput.current.focus();
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
        /* Display Message */
        if (Object.keys(response).length > 0) {
            var variant = '';
            response.success ? (variant = 'success') : (variant = 'danger');
            setVariant(variant);
            setAlertText(response?.message);
            setIsOpen(true);
            resetFormData();
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

    /* Focus Element */
    useEffect(() => {
        if (Object.keys(invalidFields).length > 0) {
            if ('name' in invalidFields) nameInput.current.focus();
            if ('description' in invalidFields) description.current.focus();
            if ('start_time' in invalidFields) sTime.current.focus();
            if ('end_time' in invalidFields) eTime.current.focus();
            if ('selected_day' in invalidFields) selectDay.current.focus();
        }
    }, [invalidFields])

    /* Handle Logout */
    const handleLogout = async () => {
        await dispatch(logout());
    }

    /* Reset Form Data */
    const resetFormData = () => {
        nameInput.current.value = '';
        description.current.value = '';
        setEndTame('');
        setStartTame('');
        setSelectedDay([]);
    }

    /* Validate Request Data */
    const validation = (formData) => {
        var error = {};
        for (const key in formData) {
            if ([null, '', undefined].includes(formData[key])) { error[key] = formData[key] };
            if (key === 'selected_day' && formData[key].length < 1) { error[key] = formData[key] };
            if (key === 'end_time' && (formData.start_time >= formData.end_time)) { error[key] = formData[key] };
        }
        setInvalidFields(error);
        return Object.keys(error).length > 0 ? false : true;
    }

    /* Get Form Data */
    const getFormData = () => {
        return {
            'name': nameInput.current.value,
            'description': description.current.value,
            'start_time': Date.parse(startTame) ? startTame.format('LT') : '',
            'end_time': Date.parse(endTame) ? endTame.format('LT') : '',
            'selected_day': selectedDay,
        }
    }

    /* Handle Submit */
    const handleSubmit = async (e) => {
        e.preventDefault();
        var formData = getFormData();
        const isValid = validation(formData);

        if (isValid) {
            var days = '';
            formData.selected_day.map((v) => {
                if (days.length === 0) { days = v.label }
                else days += ',' + v.label;
            });
            formData.selected_day = days;
            await dispatch(addEvent(formData));
        }
    }

    return (
        <div className='center'>
            <Container className='border'>
                <div className='button-right'>
                    <Button
                        variant="dark"
                        type="button"
                        size='sm'
                        onClick={() => handleLogout()}
                        disabled={loading}
                    >
                        Logout {loading && <Spinner animation="border" size="sm" />}
                    </Button>
                </div>
                <h1>Schedule Events</h1><hr />
                <Alert variant={variant} show={isOpen}>
                    {alertText}
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            className={'name' in invalidFields && 'invalid-input'}
                            placeholder="Name"
                            autoComplete='off'
                            ref={nameInput}
                            disabled={loading}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            className={'description' in invalidFields && 'invalid-input'}
                            as="textarea"
                            rows={3}
                            ref={description}
                            disabled={loading}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                            Start time
                        </Form.Label>
                        <Col sm="8">
                            <TimePicker
                                placeholder="Select Time"
                                className={'start_time' in invalidFields && 'invalid-input'}
                                showSecond={false}
                                focusOnOpen={true}
                                format="HH:mm"
                                ref={sTime}
                                onChange={time => setStartTame(time)}
                                disabled={loading}
                            />
                            {
                                'start_time' in invalidFields && (<div className='text-danger'>
                                    {INVALID_S_TIME}
                                </div>)
                            }
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                            End time
                        </Form.Label>
                        <Col sm="8">
                            <TimePicker
                                placeholder="Select Time"
                                className={'end_time' in invalidFields && 'invalid-input'}
                                showSecond={false}
                                focusOnOpen={true}
                                format="HH:mm"
                                ref={eTime}
                                onChange={time => setEndTame(time)}
                                disabled={loading}
                            />
                            {
                                'end_time' in invalidFields && (<div className='text-danger'>
                                    {INVALID_E_TIME}
                                </div>)
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Day of the Week</Form.Label>
                        <Select
                            isMulti
                            className={'selected_day' in invalidFields && 'invalid-input'}
                            options={Days}
                            value={selectedDay}
                            ref={selectDay}
                            onChange={(day) => setSelectedDay(day)}
                            isDisabled={loading}
                        />
                        {
                            'selected_day' in invalidFields && (<div className='text-danger'>
                                {INVALID_DAY}
                            </div>)
                        }
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
                        onClick={() => navigate('/home')}
                        disabled={loading}
                    >
                        {VIEW_EVENTS}
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default CreatSchedule;