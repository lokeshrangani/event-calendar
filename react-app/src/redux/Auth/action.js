import * as actionTypes from './actionType'
import api from '../../utils/api'

export const login = (request) => (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_PENDING })
    api
        .post(`login`, request)
        .then((res) => {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: res.data,
            })
        })
        .catch((err) => {
            dispatch({ type: actionTypes.LOGIN_ERROR, payload: err.response })
        })
}

export const register = (request) => (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_PENDING })
    api
        .post(`register`, request)
        .then((res) => {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                payload: res.data,
            })
        })
        .catch((err) => {
            dispatch({ type: actionTypes.REGISTER_ERROR, payload: err })
        })
}

export const logout = (request) => (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_PENDING })
    api
        .post(`v1/logout`, request)
        .then((res) => {
            dispatch({
                type: actionTypes.LOGOUT_SUCCESS,
                payload: res.data,
            })
        })
        .catch((err) => {
            dispatch({ type: actionTypes.LOGOUT_ERROR, payload: err })
        })
}