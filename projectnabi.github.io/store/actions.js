/*
* Action types
*/

export const ADD_PROJECT = 'ADD_PROJECT'
export const SET_TIME = 'SET_TIME'

/*
* Action creators
*/

export function addProject(id, project) {
    return {type: ADD_PROJECT, id: id, project: project}
}

export function setTime(id, date, time) {
    return {type: SET_TIME, id: id, date: date, time: time}
}