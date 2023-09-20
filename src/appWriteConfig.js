import { Client, Databases, Account } from 'appwrite';


export const PROJECT_ID =  `${process.env.REACT_APP_PROJECT_ID}`;
export const DATABASE_ID =  `${process.env.REACT_APP_DATABASE_ID}`;
export const COLECTION_ID_MESSAGES = `${process.env.REACT_APP_COLLECTION_ID_MESSAGES}`;
export const COLECTION_ID_ROOMS = `${process.env.REACT_APP_COLLECTION_ID_ROOMS}`; 

// export const PROJECT_ID =  '647dd06601519da8d3e6';
// export const DATABASE_ID = "6506e4e61310932c26f0" ;
// export const COLECTION_ID_MESSAGES = "6506e4eca39cec1848fc" ;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647dd06601519da8d3e6');

export const databases = new Databases(client);    
export const account = new Account(client)
export default client
