import * as types from './types'

const initState = {
    isFetching: false,
    specificDeliveryTimes: []
}

export default (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.APP_FETCHING:
            return {
                ...state,
                isFetching: true,
            }
        case types.APP_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                specificDeliveryTimes: payload.specificTimes
            }
        case types.APP_FETCH_FAIL:
            console.error(payload.error)
            return state
        default:
            return state
    }
}