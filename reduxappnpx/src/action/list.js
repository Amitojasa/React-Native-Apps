import { ADD_SERIES, MARK_COMPLETE, REMOVE_SERIES } from "./action.types"

export const addSeries = (series) => ({
    type: ADD_SERIES,
    payload: series
})
export const removeSeries = (id) => ({
    type: REMOVE_SERIES,
    payload: id
})
export const markComplete = (id) => ({
    type: MARK_COMPLETE,
    payload: id
})