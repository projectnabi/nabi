/*
* Action types
*/

export const ADD_PROJECT = 'ADD_PROJECT'
export const SET_TIME = 'SET_TIME'

/*
* Action creators
*/

export function addProject(proj) {
    return {type: ADD_PROJECT, proj}
}

export function setTime(projID, time) {
    return {type: SET_TIME, id: projID, time: time}
}