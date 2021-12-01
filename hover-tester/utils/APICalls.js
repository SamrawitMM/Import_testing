import axios from 'axios'


 export async function getListofUsers() {

  
   const response = await axios.get('https://612671ae3ab4100017a68f63.mockapi.io/api/v1/users')

   return response.data
 };



 export async function getListofServiceProviders() {
  //const response = await axios.get('https://612671ae3ab4100017a68f63.mockapi.io/api/v1/serviceproviders/')
  const response = await axios.get('http://todo-app-barkend.herokuapp.com/todos/')

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
