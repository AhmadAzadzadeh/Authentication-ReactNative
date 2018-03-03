import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import { Header, Button } from "./src/components/common";
import LoginForm from "./src/components/LoginForm";
class App extends Component {
  state = { loggedIn: null }
  componentWillMount() {
    firebase.initalizeApp({
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      storageBucket: "",
      messagingSenderId: ""
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <LoginForm />
      case false:
        return <Button onPress={() => firebase.auth().signOut()} >Log out</Button>
      default:
        return <Spinner />
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;