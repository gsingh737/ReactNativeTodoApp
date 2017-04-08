/**
 * Created by User on 4/3/2017.
 */
import uuid from 'uuid';
const INITIAL_STATE = [];

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ADD_ALERT':
            return [...state, { text: action.text, id: uuid.v4()}]
        case 'REMOVE_ALERT':
            return state.filter((alert) => alert.id !== action.id)
        default:
            return state
    }
}