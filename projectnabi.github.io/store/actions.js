/*
* Action types
*/

export const ADD_PROJECT = 'ADD_PROJECT'
export const SET_TIME = 'SET_TIME'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'
export const COMPLETE_PROJECT = 'COMPLETE_PROJECT'
export const SET_PROJECT_SCHEDULE = 'SET_PROJECT_SCHEDULE'

export const UPDATE_SETTING = 'UPDATE_SETTING'

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
export const updateProject = makeActionCreator(UPDATE_PROJECT, 'id', 'project')
export const deleteProject = makeActionCreator(DELETE_PROJECT, 'id')
export const completeProject = makeActionCreator(COMPLETE_PROJECT, 'id')
export const setProjectSchedule = makeActionCreator(SET_PROJECT_SCHEDULE, 'id', 'schedule')
export const updateSetting = makeActionCreator(UPDATE_SETTING, 'setting', 'value')