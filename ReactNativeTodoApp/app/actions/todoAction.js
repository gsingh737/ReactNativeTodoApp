import axios from 'axios';
import * as KeyChain from 'react-native-keychain';
import {TODOS_URL, TODO_URL} from '../api';
import {addAlert} from './alertsActions';

export const createTodo = (text) => {
    return (dispatch) => {
        return KeyChain.getGenericPassword().then((credentials) => {
            const {username, password} = credentials;
            return axios.post(TODOS_URL(username), {text}, {headers: {authorization: password}}).then((response) => {
                console.log(response);
                dispatch(addTodo(response.data.todo));
            }).catch((err) => {
                dispatch(addAlert("Couldn't create todo"));
            });
        });
    }
}

export const getTodos = () => {
    return (dispatch) => {
        return KeyChain.getGenericPassword().then((credentials) => {
            const {username, password} = credentials;
            return axios.get(TODOS_URL(username), {headers: {authorization: password}}).then((response) => {
                console.log(response);
                dispatch(setTodos(response.data.todos));
            }).catch((err) => {
                dispatch(addAlert("Couldn't get todos"));
            });
        });
    }
}

export const deleteTodo = (todo_id) => {
    return (dispatch) => {
        return KeyChain.getGenericPassword().then((credentials) => {
            const {username, password} = credentials;
            return axios.delete(TODO_URL(username, todo_id), {headers: {authorization: password}}).then((response) => {
                console.log(response);
                dispatch(removeTodo(todo_id));
            }).catch((err) => {
                dispatch(addAlert("Couldn't delete todo"));
            });
        });
    }
}

export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    }
};
export const setTodos = (todos) => {
    return {
        type: 'SET_TODOS',
        todos
    }
};

export const removeTodo = (_id) => {
    return {
        type: 'DELETE_TODO',
        _id
    }
};