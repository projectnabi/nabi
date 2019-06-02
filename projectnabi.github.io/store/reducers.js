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
            return update(state, { $unset: [action.id] })
        case actions.UPDATE_PROJECT:
            return update(state, {
                [action.id]: {
                    title: { $set: action.project.title },
                    name: { $set: action.project.name },
                    days: { $set: action.project.days }
                }
            })
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
                    bestStreak: { $set: nextBest },
                    health: { $set: Math.min(curState.health + 10, 100) }
                }
            })
        case actions.RESET_STREAK:
            return update(state, { [action.id]: { currentStreak: { $set: 0 } } })
        case actions.MARK_INCOMPLETE:
            return update(state, { [action.id]: { completedToday: { $set: false } } })
        case actions.SET_PROJECT_SCHEDULE:
            return update(state, { [action.id]: { schedule: { $set: action.schedule } } })
        case actions.HATCH:
            return update(state, { [action.id]: { img: { $set: 'bird' + action.species + 'x' + action.color } } })
        case actions.DAMAGE_BIRD:
            let newHealth = Math.max(state[action.id].health - action.amount, 0)
            return update(state, { [action.id]: { health: { $set: newHealth } } })
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
        case actions.HATCH:
            let bird = 'bird' + action.species + 'x' + action.color
            if (!state.foundBirds) {
                return update(state, { foundBirds: { $set: [bird] } })
            } else if (!state.foundBirds.includes(bird)) {
                return update(state, { foundBirds: { $push: [bird] } })
            }
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
