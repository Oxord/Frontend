import { databases, storage, ID, APPWRITE_CONFIG } from './api';
import { Permission, Query, Role } from 'appwrite';

export const uploadImage = async (file: File) => {
    try {
        const response = await storage.createFile(APPWRITE_CONFIG.BUCKET_ID, ID.unique(), file);
        
        const result = storage.getFileView(APPWRITE_CONFIG.BUCKET_ID, response.$id);
        
        return result.toString(); 
    } catch (error) {
        console.error(error);
        return null;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const savePresentationToCloud = async (userId: string, presentationData: any, docId?: string) => {
    const jsonString = JSON.stringify(presentationData);

    try {
        if (docId) {
            return await databases.updateDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID,
                docId,
                { data: jsonString }
            );
        } else {
            return await databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID,
                ID.unique(),
                { 
                    data: jsonString,
                    owner_id: userId 
                },
                [
                    Permission.read(Role.user(userId)),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId))
                ]
            );
        }
    } catch (error) {
        console.error("Save failed", error);
        throw error;
    }
};

export const getUserPresentations = async (userId: string) => {
    return await databases.listDocuments(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.COLLECTION_ID,
        [
            Query.equal('owner_id', userId),
            Query.orderDesc('$updatedAt')
        ]
    );
}

export const deletePresentationFromCloud = async (docId: string) => {
    return await databases.deleteDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.COLLECTION_ID,
        docId
    );
}