import { combineReducers } from 'redux';
import * as actions from './actions';
import update from 'immutability-helper';

const defaultSettings = {
    initialTime: 120
}

function projectList(state = {}, action) {
    switch (action.type) {
        case actions.ADD_PROJECT:
            return update(state, { [action.id]: { $set: action.project } })
        case actions.DELETE_PROJECT:
            return update(state, { [action.id]: { $set: null } })
        case actions.SET_TIME:
            return update(state, { [action.id]: { markedDates: { [action.date]: { $set: action.time } } } })
        case actions.MARK_DONE:
            return update(state, { [action.id]: { completedToday: { $set: true } } })
        case actions.INCR_STREAK:
            let curState = state[action.id]
            let nextCompletions = !curState.completions && 1 || curState.completions + 1
            let nextStreak = !curState.currentStreak && 1 || curState.currentStreak + 1
            let nextBest = !curState.bestStreak && nextStreak || Math.max(nextStreak, curState.bestStreak)
            return update(state, {
                [action.id]: {
                    completions: { $set: nextCompletions },
                    currentStreak: { $set: nextStreak },
                    bestStreak: { $set: nextBest }
                }
            })
        case actions.RESET_STREAK:
            return update(state, { [action.id]: { currentStreak: { $set: 0 } } })
        case actions.MARK_INCOMPLETE:
            return update(state, { [action.id]: { completedToday: { $set: false } } })
        case actions.SET_PROJECT_SCHEDULE:
            return update(state, { [action.id]: { schedule: { $set: action.schedule } } })
        default:
            return state
    }
}

function settings(state = defaultSettings, action) {
    switch (action.type) {
        case actions.UPDATE_SETTING:
            return update(state, { [action.setting]: { $set: action.value } })
        default:
            return state
    }
}


function user(state = {}, action) {
    switch (action.type) {
        case actions.UPDATE_LAST_SEEN:
            return update(state, { lastSeen: { $set: action.time } })
        default:
            return state
    }
}

const baseReducer = combineReducers({
    projectList,
    settings,
    user
})

export default baseReducer
