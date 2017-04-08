import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {AsyncStorage} from 'react-native';
import {persistStore, autoRehydrate} from 'redux-persist'
import TodoReducer from '../reducer';
import {reducer as formReducer} from 'redux-form';
import authReducer from '../reducer/authReducer';
import alertsReducer from '../reducer/alertsReducer';
const state = {
    todos: []
};

const rootReducer = combineReducers({
                        todos: TodoReducer,
                        form: formReducer,
                        auth: authReducer,
                        alerts: alertsReducer
                    });

export const configureStore = (initial_state = state) => {
    const store = createStore(rootReducer, initial_state, compose(
        applyMiddleware(thunk),
        autoRehydrate()
    ));
    persistStore(store, {storage: AsyncStorage, blacklist: ['formReducer', 'alertsReducer']});
    return store;
};
