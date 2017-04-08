/**
 * Created by User on 4/4/2017.
 */
const API_URL = 'http://10.0.2.2:3000/v1';
export const SIGNIN_URL = `${API_URL}/signin`;
export const SIGNUP_URL = `${API_URL}/signup`;
export const TODOS_URL = (user_id) => `${API_URL}/users/${user_id}/todos`;
export const TODO_URL = (user_id, todo_id) => `${API_URL}/users/${user_id}/todo/${todo_id}`;


