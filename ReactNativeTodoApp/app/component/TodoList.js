/**
 * Created by User on 4/6/2017.
 */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {View, Text, TextInput, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';
import {connect} from 'react-redux';
import {unauthUser, getTodos} from '../actions';

class TodoList extends Component {
    state = {
        newTodoText: '',
        refreshing: false
    };

    addNewTodo(){
        this.props.navigator.push({
            component: NewTodo,
            title: 'New Todo'
        });
    }
    onRefresh(){
        this.setState({refreshing: true});
        this.props.dispatch(getTodos()).then(() => {
            this.setState({refreshing: false});
        });
    }

    onLogout() {
        this.props.dispatch(unauthUser);
    }


    render() {
        const renderTodos = () => {
            return this.props.todos.map((todo) => <TodoItem text={todo.text} key={todo._id} id={todo._id}/>)
        };

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={this.onLogout.bind(this)}>
                        <Icon name="x" size={20} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        To-Do List
                    </Text>
                    <TouchableOpacity onPress={this.addNewTodo.bind(this)}>
                        <Icon name="plus" size={20} color="white"/>
                    </TouchableOpacity>
                </View>
                <ScrollView AUTOMATICALLYADJUSTCONTENTINSETS={false}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}>
                    {renderTodos()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({todos}) => {
    return { todos } ;
};


const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: '#2ecc71'
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
};

export default connect(mapStateToProps)(TodoList);
