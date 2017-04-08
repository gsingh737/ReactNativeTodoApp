/**
 * Created by User on 4/3/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';

import {removeAlert} from '../../actions'

class Alert extends Component {
    onRemoveAlert(){
      this.props.dispatch(removeAlert(this.props.alert.id));
    }

    render() {
        return (
        <TouchableWithoutFeedback onPress={this.onRemoveAlert.bind(this)}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.alert.text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        backgroundColor:'#f2dede',
        borderColor: '#ebccd1',
        borderTopWidth: 2
    },
    text: {
        color: '#a94242'
    }
}

export default connect()(Alert);