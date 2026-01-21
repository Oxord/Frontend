import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client()

const PROJECT_ID = '696fe56c00078136859d'
const DATABASE_ID = '696ff6030021fb95dea2'
const COLLECTION_ID = 'presentations'
const BUCKET_ID = '696ff867003d0d9b5299'

client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1') 
    .setProject(PROJECT_ID); 

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };

export const APPWRITE_CONFIG = {
    DATABASE_ID,
    COLLECTION_ID,
    BUCKET_ID
};