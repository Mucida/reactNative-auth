import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component{
	state = { loggedIn: null };

	componentWillMount(){
		firebase.initializeApp({
		    apiKey: 'AIzaSyDQEhc0fyu7bBnbP46vf8h6OOO6K7qFAuA',
		    authDomain: 'auth-6285d.firebaseapp.com',
		    databaseURL: 'https://auth-6285d.firebaseio.com',
		    projectId: 'auth-6285d',
		    storageBucket: 'auth-6285d.appspot.com',
		    messagingSenderId: '20009183671'
		 });

		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent(){
		switch(this.state.loggedIn) {
			case true:
				return <Button>Log Out</Button>;
			case false:
				return <LoginForm />;
			default:
				return <Spinner size="large" />;
		}
	}

	render () {
		return (
			<View>
				<Header headerText="Authentication" />
				<View style={styles.buttonStyle}>
					{this.renderContent()}
				</View>
			</View>
		);
	}
}

const styles ={
	buttonStyle :{
		displayDirection: 'row'
	}
};

export default App;
