import { createStore, applyMiddleware } from 'redux'
import { persistCombineReducers, persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thunk from 'redux-thunk'

import { appOps, userOps, mealboxOps, minibuffetOps } from './operations'


import app from './app'
import user from './user'
import mealbox from './mealbox'
import minibuffet from './minibuffet'

const rootConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [
        'app',
        'user',
        'mealbox',
        'minibuffet'
    ]
}

const appConfig = {
    key: 'app',
    storage: AsyncStorage,
    blacklist: [
        'isFetching'
    ]
}

const userConfig = {
    key: 'user',
    storage: AsyncStorage,
    blacklist: [
        'isFetching',
        'error',
        'history'
    ]
}

const mealboxConfig = {
    key: 'mealbox',
    storage: AsyncStorage,
    blacklist: [
        'selectedDate',
        'selectedDateIndex',
        'showFilter'
    ]
}

const minibuffetConfig = {
    key: 'minibuffet',
    storage: AsyncStorage,
    blacklist: [
        'searchInfo'
    ]
}

const reducers = persistCombineReducers(rootConfig, {
    app: persistReducer(appConfig, app),
    user: persistReducer(userConfig, user),
    mealbox: persistReducer(mealboxConfig, mealbox),
    minibuffet: persistReducer(minibuffetConfig, minibuffet),
})

const store = createStore(reducers, applyMiddleware(thunk))
const persistor = persistStore(store)

export {
    store,
    persistor,
    appOps, userOps, mealboxOps, minibuffetOps
}