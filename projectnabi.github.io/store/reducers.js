import { combineReducers } from 'redux';
import * as actions from './actions';
import update from 'immutability-helper';

const defaultSettings = {
    initialTime: 120
}

function projectList(state = {}, action) {
    switch (action.type) {
        case actions.ADD_PROJECT:
            return update(state, {[action.id]: {$set: action.project}})
        case actions.SET_TIME:
            return update(state, {[action.id]: {markedDates: {[action.date]: {$set: action.time}}}})
        default:
            return state
    }
}

function settings(state = defaultSettings, action) {
    switch (action.type) {
        case actions.UPDATE_SETTING:
            return update(state, {[action.setting]: {$set: action.value}})
        default:
            return state
    }
}

const baseReducer = combineReducers({
    projectList,
    settings
})

export default baseReducer