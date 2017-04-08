/**
 * Created by User on 4/3/2017.
 */

const INITIAL_STATE = {
    user_id: null
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'AUTH_USER':
            return {
                user_id: action.user_id
            };
        case 'UNAUTH_USER':
            return {
                user_id: null
            };
        default:
            return state
    }
}