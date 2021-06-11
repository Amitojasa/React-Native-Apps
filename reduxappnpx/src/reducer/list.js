import { ADD_SERIES, REMOVE_SERIES, MARK_COMPLETED } from "../action/action.types";

const initialState = []


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SERIES:
            return [...state, action.payload];
        case REMOVE_SERIES:
            return state.filter((series) => series.id !== action.payload)
        case MARK_COPLETE:
            return state.map((series) => {
                if (series.id === action.payload) {
                    series.isWatched = !series.isWatched
                }
            })



    }
}