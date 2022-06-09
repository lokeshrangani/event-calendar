import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSchedule } from '../../redux/Event/action';
import { logout } from '../../redux/Auth/action';
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const ViewSchedule = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, events } = useSelector(state => state.EventReducer);
    var isCalling = false;
    const token = localStorage.getItem('omnifyAccessToken') || '';
    const localizer = momentLocalizer(moment)
    const [eventList, setEventList] = useState([]);
    const [viewType, setViewType] = useState('Calendar');
    const [btnText, setBtnText] = useState('JSON');

    useEffect(() => {
        /* Check If User Logged In or not */
        if (token.length === 0) navigate('/');
        !isCalling && getAllSchedule();
        isCalling = true;
    }, [])

    useEffect(() => {
        if (events.length > 0) {
            var tempEvents = [];
            var schedule = [];
            for (let key in events) {
                var innerObj = events[key];
                for (let k in innerObj) {
                    var obj1 = innerObj[k];
                    obj1.start = Date.parse(obj1.start) ? new Date(obj1.start) : obj1.start
                    obj1.end = Date.parse(obj1.end) ? new Date(obj1.end) : obj1.end
                    tempEvents[key] = obj1;
                    schedule.push(tempEvents[key])
                }
            }
            setEventList(schedule)
        }
    }, [events])

    /* Get All Schedule */
    const getAllSchedule = async () => {
        await dispatch(getSchedule());
        isCalling = false;
    }

    /* Handle Logout */
    const handleLogout = async () => {
        await dispatch(logout());
    }

    /* See JSON */
    const changeViewType = () => {
        var temp = 'Calendar';
        if (viewType === 'Calendar') temp = 'JSON'
        if (temp === 'JSON') setBtnText('Calendar')
        else setBtnText('JSON')
        setViewType(temp);
    }

    return (
        <div className='center'>
            <Container className='border'>
                <div className='button-right'>
                    <Button
                        style={{ marginRight: '3px' }}
                        variant="link"
                        type="button"
                        size='sm'
                        onClick={() => changeViewType()}
                        disabled={loading}
                    >
                        View {btnText}
                    </Button>{" "}
                    <Button
                        style={{ marginRight: '3px' }}
                        variant="link"
                        type="button"
                        size='sm'
                        onClick={() => getAllSchedule()}
                        disabled={loading}
                    >
                        Refresh
                    </Button>{" "}
                    <Button
                        style={{ marginRight: '3px' }}
                        variant="dark"
                        type="button"
                        size='sm'
                        onClick={() => navigate('/schedule')}
                        disabled={loading}
                    >
                        Add
                    </Button>{" "}
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
                <h1>Scheduled Events</h1><hr />
                <div style={{ height: 700, maxWidth: 1300 }}>
                    {
                        viewType === 'Calendar' && (
                            <Calendar
                                localizer={localizer}
                                formats={"DD/MM/YYYY HH:mm"}
                                events={eventList || []}
                                startAccessor="start"
                                endAccessor="end"
                            />
                        )
                    }
                    {
                        viewType === 'JSON' && (
                            <Form.Control
                                as="textarea"
                                rows={25}
                                value={eventList && JSON.stringify(eventList, null, 4)}
                                disabled={true}
                            />
                        )
                    }
                </div>
            </Container>
        </div>
    )
}

export default ViewSchedule;