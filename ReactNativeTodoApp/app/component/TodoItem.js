import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {deleteTodo} from '../actions';
import {connect} from 'react-redux';

class TodoItem extends Component {
    state = {
        deleting: false
    }

    deleteSelf(){
        this.setState({delete: true});
        this.props.dispatch(deleteTodo(this.props.id));
    }
    render() {
        const renderDeleteButton = () => {
            if(!this.state.deleting) {
                return (
                <TouchableOpacity onPress={this.deleteSelf.bind(this)}>
                    <Icon name="x" size={15} color="#2ecc71"/>
                </TouchableOpacity>);
            }
        };
        return (
            <View style={styles.todoContainer}>
                <Text style={styles.todoText}>
                    {this.props.text}
                </Text>
                {renderDeleteButton()}
            </View>
        );
    }
}

export default connect()(TodoItem);

const styles = {
    todoContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: -1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    todoText: {
        fontSize: 20
    },
    title: {
        fontSize: 20,
        color: 'white'
    }
};