/**
 * Created by User on 4/3/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View
} from 'react-native';
import Alert from './Alert';

class AlertContainer extends Component {
    renderAlerts = () => {
        return (
            this.props.alerts.map((alert) => <Alert alert={alert} key={alert.id}/>)
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderAlerts()}
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
};
const mapStateToProps = (state) => {
    return {
        alerts: state.alerts
    };
};

export default connect(mapStateToProps)(AlertContainer);
