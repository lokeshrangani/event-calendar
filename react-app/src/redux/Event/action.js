import * as actionTypes from './actionType'
import api from '../../utils/api'

export const addEvent = (request) => (dispatch) => {
    dispatch({ type: actionTypes.ADD_EVENT_PENDING })
    api
        .post(`v1/add-event`, request)
        .then((res) => {
            dispatch({
                type: actionTypes.ADD_EVENT_SUCCESS,
                payload: res.data,
            })
        })
        .catch((err) => {
            dispatch({ type: actionTypes.ADD_EVENT_ERROR, payload: err.response })
        })
}

export const getSchedule = () => (dispatch) => {
    dispatch({ type: actionTypes.GET_SCHEDULE_PENDING })
    api
        .post(`v1/get-event`)
        .then((res) => {
            dispatch({
                type: actionTypes.GET_SCHEDULE_SUCCESS,
                payload: res.data,
            })
        })
        .catch((err) => {
            dispatch({ type: actionTypes.GET_SCHEDULE_ERROR, payload: err })
        })
}