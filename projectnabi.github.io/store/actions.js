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

export function addProject(id, project) {
    return {type: ADD_PROJECT, id: id, project: project}
}

export function setTime(id, date, time) {
    return {type: SET_TIME, id: id, date: date, time: time}
}

export function updateProject(id, project) {
    return {type: UPDATE_PROJECT, id: id, project: project}
}

export function deleteProject(id) {
    return {type: DELETE_PROJECT, id: id}
}

export function completeProject(id) {
    return {type: COMPLETE_PROJECT, id: id}
}

export function setProjectSchedule(id, schedule) {
    return {type: SET_PROJECT_SCHEDULE, id: id, schedule: schedule}
}

export function updateSetting(setting, value) {
    return {type: UPDATE_SETTING, setting: setting, value: value}
}