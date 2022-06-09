import * as actionTypes from './actionType'

const reducer = (
    state = {
        loading: false,
        response: {},
        error: {},
        events: []
    },
    action,
) => {
    switch (action.type) {
        case actionTypes.ADD_EVENT_PENDING:
            return {
                ...state,
                loading: false,
                response: {},
                error: {}
            }
        case actionTypes.ADD_EVENT_ERROR:
            return {
                ...state,
                loading: false,
                response: {},
                error: action.payload
            }
        case actionTypes.ADD_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {},
                response: action.payload
            }

        case actionTypes.GET_SCHEDULE_PENDING:
            return {
                ...state,
                loading: false,
                response: {},
                error: {}
            }
        case actionTypes.GET_SCHEDULE_ERROR:
            return {
                ...state,
                loading: false,
                response: {},
                error: action.payload
            }
        case actionTypes.GET_SCHEDULE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {},
                events: action.payload.events
            }
        default: return state;
    }
}

export default reducer