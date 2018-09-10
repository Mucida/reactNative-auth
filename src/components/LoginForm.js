import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component{
	state = { emailState: '', passState: '', error: '', loading: false };

	onButtonPress(){
		const { emailState, passState } = this.state//teve q ser igual ao state

		this.setState({ error: '', loading: true });

		firebase.auth().signInWithEmailAndPassword(emailState, passState) //return promess
			.then(this.onLoginSuccess.bind(this))//binding the context,w e dont know when and with witch context it will be handle
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(emailState, passState)//promess
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLogingFail.bind(this));
			});
	}

	onLogingFail(){
		this.setState({ 
			error: 'Authentication failed',
			loading: false 
		});
	}

	onLoginSuccess() {
		this.setState({
			emailState: '',
			passState: '',
			loading: false,
			error: ''
		})
	}

	renderButton() {
		if (this.state.loading){
			return <Spinner size="small" />;
		}
		else {
			return (
				<Button onPress={this.onButtonPress.bind(this)}>
						Login
				</Button>
			);
		}
	}


	render() {
		return (
			<Card>
				<CardSection>
					<Input //nao tem secureTextEntry, entao eh undefined
						label="Email"
						placeholder="user@gmail.com"
						value={this.state.emailState}
						onChangeText={email => this.setState({emailState: email})}
					/>
				</CardSection>
				<CardSection>
					<Input 
						secureTextEntry
						label="Password"
						placeholder="password"
						value={this.state.passState}
						onChangeText={pass => this.setState({passState: pass})}
					/>
				</CardSection>
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}


const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;