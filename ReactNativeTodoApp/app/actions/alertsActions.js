/**
 * Created by User on 4/3/2017.
 */
export const addAlert = (text) => {
    return {
        type: 'ADD_ALERT',
        text
    }
}

export const removeAlert = (id) => {
    return {
        type: 'REMOVE_ALERT',
        id
    }
}