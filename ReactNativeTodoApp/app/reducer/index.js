const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case 'ADD_TODO':
            return [
                ...state,
                action.todo
            ];
        case 'SET_TODOS':
            return action.todos;
        case 'DELETE_TODO':
             return state.filter((todo) => todo._id !== action._id);
        default:
            return state;
    }
}