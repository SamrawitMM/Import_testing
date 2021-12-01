import axios from 'axios'
const RNHoverReactSdk = NativeModules.RNHoverReactSdk;
import { Platform, StyleSheet,  Alert,TouchableOpacity,TextInput ,Text, View, Button,FlatList, NativeModules, NativeEventEmitter } from 'react-native';
import EventEmitter from 'EventEmitter';




 export async function getListofUsers() {

  
   const response = await axios.get('https://612671ae3ab4100017a68f63.mockapi.io/api/v1/users')

   return response.data
 };



 export async function getListofServiceProviders() {
  const response = await axios.get('https://612671ae3ab4100017a68f63.mockapi.io/api/v1/serviceproviders')

  return response.data
};


export async function getListofTransactions() {
  const response = await axios.get('https://612671ae3ab4100017a68f63.mockapi.io/api/v1/transactions')

  return response.data
};



export async function MyApp() {
  const response = await axios.get('https://612671ae3ab4100017a68f63.mockapi.io/api/v1/App')

  return response.data
};





export async function PostStatus(){

  const token = '';

 const response = await axios({
             method: 'post',
             url: '/user/12345',
             headers: {"Authorization" : `Bearer ${token}`} ,
        data: {
            Username: 'hulupay@gmail.com',
            password: 'testpass'
              }
  });
  
}





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
