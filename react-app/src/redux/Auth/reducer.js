import * as actionTypes from './actionType'

const reducer = (
    state = {
        loading: false,
        response: {},
        error: {}
    },
    action,
) => {
    switch (action.type) {
        case actionTypes.LOGIN_PENDING:
            return {
                ...state,
                loading: false,
                response: {},
                error: {}
            }

        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                response: {},
                error: action.payload
            }

        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {},
                response: action.payload
            }


        case actionTypes.REGISTER_PENDING:
            return {
                ...state,
                loading: false,
                response: {},
                error: {}
            }

        case actionTypes.REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                response: {},
                error: action.payload
            }

        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {},
                response: action.payload
            }


        case actionTypes.LOGOUT_PENDING:
            return {
                ...state,
                loading: false,
                response: {},
                error: {}
            }

        case actionTypes.LOGOUT_ERROR:
            return {
                ...state,
                loading: false,
                response: {},
                error: action.payload
            }

        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {},
                response: action.payload
            }
        default: return state;
    }
}

export default reducer