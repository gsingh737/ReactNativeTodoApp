import React, {Component} from 'react';
import {
    Navigator
} from 'react-native';

import TodoList from './TodoList';

class Main extends Component{
    renderScene(route, navigator) {
        return (<route.component navigator={navigator} />);
    }
    render() {
        return (
            <Navigator
                initialRoute={{
                    component: TodoList,
                    title: 'Todo List',
                    navigationBarHidden: true
                }}
                renderScene={this.renderScene}
                sceneStyle={{flex: 1}}
            />
        )
    };
}



export default Main;
