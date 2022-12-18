import * as types from './types'

export const productsFetching = () => {
    return {
        type: types.APP_FETCHING,
    }
}

export const fetchingSuccess = (payload) => {
    return {
        type: types.APP_FETCH_SUCCESS,
        payload
    }
}

export const fetchingFail = (payload) => {
    return {
        type: types.APP_FETCH_FAIL,
        payload
    }
}