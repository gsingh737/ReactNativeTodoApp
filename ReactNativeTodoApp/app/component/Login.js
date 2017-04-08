import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {loginUser, signupUser, addAlert} from '../actions';

const renderField = ({input: {onChange, ...restInput}, meta: {touched, error}, placeholder}) => {
    return (<View style={styles.field}>
                <TextInput placeholder={placeholder} onChangeText={onChange} {...restInput} style={styles.textInput} underlineColorAndroid={"transparent"}/>
                <View>
                    {(touched && error) && <Text style={styles.formError}> {error}</Text>}
                </View>
            </View>

    );
};


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    onSignIn(values){
        this.setState({
            loading: true
        });
        this.props.dispatch(loginUser(values.email, values.password)).then(() => {
            this.setState({
                loading: false
            });
        })
    }
    onSignUp(values){
        //     const {handleSubmit} = this.props;
        if(!values)
        {
            return;
        }
        this.props.dispatch(signupUser(values.email, values.password));
    }

    render() {
        const {handleSubmit} = this.props;

        if(this.state.loading) {
            return (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        Loading...
                    </Text>
                </View>);
        }
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}> To-do</Text>
                </View>
                <Field name="email"
                       placeholder="Email"
                       component={renderField}/>
                <Field name="password"
                       placeholder="Password"
                       component={renderField}/>

                {/*<View style={styles.field}>*/}
                    {/*<TextInput placeholder="Email" style={styles.textInput} underlineColorAndroid={"transparent"}/>*/}
                {/*</View>*/}
                {/*<View style={styles.field}>*/}
                    {/*<TextInput placeholder="Password" style={styles.textInput}  underlineColorAndroid={"transparent"}/>*/}
                {/*</View>*/}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={handleSubmit(this.onSignIn.bind(this))}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={handleSubmit(this.onSignUp.bind(this))} >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: 20,
        backgroundColor: '#aaa'
    },
    titleContainer: {
        padding: 10
    },
    title: {
        color: 'white',
        fontSize: 35
    },
    field: {
        borderRadius: 5,
        padding: 5,
        paddingLeft: 8,
        margin: 7,
        marginTop: 0,
        backgroundColor: 'white'
    },
    textInput : {
        height: 26,
        paddingBottom: 0,
    },
    buttonContainer:{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        fontSize: 30,
        color: 'white'
    },
    formError: {
        color: 'red'
    }
}
const validate = (formProps) => {
    const errors  = {};
    if(!formProps.email) {
        errors.email = "Please enter an email";
    }
    if(!formProps.password) {
        errors.password = "Please enter password"
    }
    return errors;
};


export default reduxForm({
    form: 'login',
    validate
})(Login);