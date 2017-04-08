/**
 * Created by User on 4/6/2017.
 */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {View, Text, TextInput, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {createTodo} from '../actions'
class NewTodo extends Component {
    state = {
        newTodoText: '',
        loading: false
    }
    addNewTodo(){
        const {newTodoText}  = this.state;
        if(newTodoText && newTodoText !== '') {
            this.setState({
                newTodoText:'',
                loading: true
            });
            this.props.dispatch(createTodo(newTodoText)).then(() => {
                this.setState({loading: false});
                this.props.navigator.pop();
            });
        }
    }
    goBack(){
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Icon name="chevron-left" size={20} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        New To-do
                    </Text>
                    <TouchableOpacity onPress={this.addNewTodo.bind(this)}>
                        <Icon name="check" size={20} color="white"/>
                    </TouchableOpacity>
                </View>

                <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.inputContainer}>
                    <TextInput
                        onChange={(event) => {
                            this.setState({
                                newTodoText: event.nativeEvent.text
                            });
                        }}
                        value={this.state.newTodoText}
                        returnKeyType="done"
                        placeholder="A new todo"
                        onSubmitEditing={this.addNewTodo.bind(this)}
                        style={styles.input}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
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
    inputContainer: {
        padding: 5,
        paddingTop: 0,
        paddingLeft: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    input: {
        height: 40,
        padding: 4,
        fontSize: 20
    },
    title: {
        fontSize: 20,
        color: 'white'
    },

};

export default connect() (NewTodo);