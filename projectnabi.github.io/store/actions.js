/*
* Action types
*/

export const ADD_PROJECT = 'ADD_PROJECT'
export const SET_TIME = 'SET_TIME'
export const MARK_DONE = 'MARK_DONE'
export const MARK_INCOMPLETE = 'MARK_INCOMPLETE'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'
export const COMPLETE_PROJECT = 'COMPLETE_PROJECT'
export const DAMAGE_BIRD = 'DAMAGE_BIRD'
export const SET_PROJECT_SCHEDULE = 'SET_PROJECT_SCHEDULE'
export const INCR_STREAK = 'INCR_STREAK'
export const RESET_STREAK = 'RESET_STREAK'
export const HATCH = 'HATCH'

export const UPDATE_SETTING = 'UPDATE_SETTING'

export const UPDATE_LAST_SEEN = 'UPDATE_LAST_SEEN'

/*
* Action creators
*/

function makeActionCreator(type, ...argNames) {
    return function (...args) {
        const action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}

export const addProject = makeActionCreator(ADD_PROJECT, 'id', 'project')
export const setTime = makeActionCreator(SET_TIME, 'id', 'date', 'time')
export const markDone = makeActionCreator(MARK_DONE, 'id')
export const markIncomplete = makeActionCreator(MARK_INCOMPLETE, 'id')
export const incrStreak = makeActionCreator(INCR_STREAK, 'id')
export const resetStreak = makeActionCreator(RESET_STREAK, 'id')
export const updateProject = makeActionCreator(UPDATE_PROJECT, 'id', 'project')
export const deleteProject = makeActionCreator(DELETE_PROJECT, 'id')
export const completeProject = makeActionCreator(COMPLETE_PROJECT, 'project')
export const damageBird = makeActionCreator(DAMAGE_BIRD, 'id', 'amount')
export const setProjectSchedule = makeActionCreator(SET_PROJECT_SCHEDULE, 'id', 'schedule')
export const updateSetting = makeActionCreator(UPDATE_SETTING, 'setting', 'value')
export const updateLastSeen = makeActionCreator(UPDATE_LAST_SEEN, 'time')
export const hatch = makeActionCreator(HATCH, 'id', 'species', 'color')