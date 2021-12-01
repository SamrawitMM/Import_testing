/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component , useState } from 'react';
import { Platform, StyleSheet,  Alert,TouchableOpacity,TextInput ,Text, View, Button,FlatList, NativeModules, NativeEventEmitter } from 'react-native';
import EventEmitter from 'EventEmitter';

import {getListofServiceProviders , getListofUsers , getListofTransactions , MyApp } from './utils/APICalls';
import APICalls from './utils/APICalls';

import { isUserWhitespacable } from '@babel/types';




const RNHoverReactSdk = NativeModules.RNHoverReactSdk;


export default class App extends Component {


		constructor(probs){
			super(probs);
			this.state = { 
				permsGranted: false, 
				gotSMSResponse: false,
				
				resultText: "" ,
				phone:"" , ammount:"", reason:'',
				
				userdata:[]

				
			  }



		}
			

	async onTUpdate(data) {
		// RNHoverReactSdk.showToast("received t update for uuid: " + data.uuid);
		this.setState({ gotSMSResponse: true })
	}

	componentWillMount() {
		const transactionEmitter = new NativeEventEmitter(RNHoverReactSdk)
		const subscription = transactionEmitter.addListener(
			"transaction_update", (data) => this.onTUpdate(data));
	}

	async getPerm() {
		try {
			var response = await RNHoverReactSdk.getPermission();
			this.setState({ permsGranted: true });
		} catch (e) {
			this.setState({ permsGranted: false });
		}
	}

	async checkPermState() {
		var hasPs = await RNHoverReactSdk.hasAllPermissions();
		this.setState({ permsGranted: hasPs });
		return hasPs;
	}


	// calling an api for the application

	async Application(){

		try{

			const myapp = MyApp();
			myapp.then(function (app_response) {
				console.log( app_response);
		
				this.State ({
							
								userdata:app_response.data

							}).bind(this)
			
				 return app_response.data;

			})

		}
		catch(e){
			console.log(e.message);
		}
	}




	// calling an api for  list of users 
		async ListofUsers (){

				try{
					var users = getListofUsers();

					users.then(function (users_response) {
						console.log( users_response);
		
								this.State ({
											
												userdata:users_response.data
		
											}).bind(this)
							
								 return users_response.data;
					})
				} catch(e){

					console.log(e.message)
				}


			}



		// calling an api for the list of service providers

		async ListofServiceProviders (){
			var providers = getListofServiceProviders();
			providers.then(function (providers_response) {
					

				console.log( providers_response);

			   

				 return providers_response.data;
		})
		}			
	

		// calling an api for Transcations

		async ListofTransaction(){

			var transaction = getListofTransactions();

			transaction.then(function (transaction_response) {
					
				console.log( transaction_response);
				 return transaction_response.data;
	    	})
					

			
		}







	async makeRequest() {
		try {
			// extras = {"amount": "100", "other": "thing", "recipient": "43214324"};
			
					await this.Application()
			 
		

			if (this.state.providers != undefined) {
				RNHoverReactSdk.showToast(this.state.providers); 
				// RNHoverReactSdk.showToast(apiresponse);
			

			}
			else {
				RNHoverReactSdk.showToast("providers not found");
			}

			
			var account = this.state.phone;
			var fee = this.state.ammount;
			var reason = this.state.reason;
		
			extras = {"accountNumber":account, "amount": fee , "reason":reason } ;


			var response = await RNHoverReactSdk.makeRequest("15a8a89b", extras);
			RNHoverReactSdk.showToast("received session result: " + response.uuid);
			this.setState({ resultText: response.response_message });
		} catch (e) {
			RNHoverReactSdk.showToast(e.message);
		}
	}

	render() {
		this.checkPermState();
		
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Hello World</Text>
				<Button id="get-perm-btn"
					onPress={this.getPerm.bind(this)}
					title="Get Permission"
					color="#841584"
					accessibilityLabel="Get Permission"
				/>
				{this.state.permsGranted ? <Text style={styles.granted}>Permissions Granted</Text> : <Text style={styles.granted}>Permissions not granted</Text>}
			
				<TextInput
					style={styles.input}
					
					placeholder="Account number"
					keyboardType="numeric"

					onChangeText = {phone => {this.setState({phone})} }
				/>

				<TextInput
					style={styles.input}
					placeholder="Ammount"
					keyboardType="numeric"
					onChangeText = {ammount => {this.setState({ammount})} }
					
				/>
			
			
			<TextInput
					style={styles.input}
					
					placeholder="Reason"
					

					onChangeText = {reason => {this.setState({reason})} }
				/>

                            

				<Button
					onPress={this.makeRequest.bind(this)}
					title="Send Money"
					color="#EB7D23"
					accessibilityLabel="Check Balance Button"
				/>
				<Text style={styles.granted}>{this.state.resultText}</Text>


				{this.state.gotSMSResponse ? <Text style={styles.granted}>Received SMS</Text> : null}

				



			
			</View>

			
		


				
		);
	
	

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	granted: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},

	input: {
	  
	  height: 40,
	  width: 280,
	  margin: 5,
	  borderWidth: 1,
	}
  
});


export async function makeRequest(account,fee,reason) {
	try {

		   
	 console.log(account,fee,reason)
		   extras = {"accountNumber":account, "amount": fee , "reason":reason } ;


		   var response = await RNHoverReactSdk.makeRequest("15a8a89b", extras);
		   RNHoverReactSdk.showToast("received session result: " + response.uuid);
		   
	   } catch (e) {
		   RNHoverReactSdk.showToast(e.message);
	   }
   }
