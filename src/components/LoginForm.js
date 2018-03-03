import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import firebase from "firebase";
import { Card, CardSection, Button, Input, Spinner } from "./common";
class LoginForm extends Component {
    state = { email: "", password: "", error: "", loading: false }
    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: "", loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(() => {
                        this.setState({ error: "Authentication Failed.", loading: false });
                    });
            });
    }
    onLoginSuccess(){
        this.setState({
            email: "",
            password: "",
            loading: false,
            error: ""
        });
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner />
        }
        return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@gmail.com"
                        secureTextEntry={false}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle} >{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: "center",
        color: "red"
    }
});

export default LoginForm;