import React, {Component} from 'react';
import {
    Text,
    View,
    StatusBar
} from 'react-native';
import Main from './Main';
import {connect} from 'react-redux';
import AlertContainer from './alerts/AlertContainer';

import Login from './Login';
class App extends Component {
    renderView = () => {
        if(this.props.user_id) {
            return (<Main />);
        }
        return (<Login/>);
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <StatusBar barStyle={"light-content"}/>
                {this.renderView()}
                <AlertContainer/>
            </View>
        )
    }
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#ccc'
    }
}
const mapStateToProps = ({auth: {user_id}}) => ({user_id});
export default connect(mapStateToProps)(App);