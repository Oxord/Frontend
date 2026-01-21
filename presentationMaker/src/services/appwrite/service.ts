// Frontend/presentationMaker/src/appwrite/service.ts
import { databases, storage, ID, APPWRITE_CONFIG } from './api';
import { Permission, Role } from 'appwrite';

// Функция загрузки файла в Storage
export const uploadImage = async (file: File) => {
    try {
        const response = await storage.createFile(APPWRITE_CONFIG.BUCKET_ID, ID.unique(), file);
        
        // getFileView возвращает URL (обычно объект URL или строку)
        const result = storage.getFileView(APPWRITE_CONFIG.BUCKET_ID, response.$id);
        
        // Просто приводим к строке или возвращаем как есть
        return result.toString(); 
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Функция сохранения презентации (Создание или Обновление)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const savePresentationToCloud = async (userId: string, presentationData: any, docId?: string) => {
    const jsonString = JSON.stringify(presentationData);

    try {
        if (docId) {
            // Если документ уже есть, обновляем его
            return await databases.updateDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID,
                docId,
                { data: jsonString }
            );
        } else {
            // Если документа нет, создаем новый
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

// Функция загрузки списка презентаций пользователя
export const getUserPresentations = async (userId: string) => {
    // В реальном Appwrite лучше использовать Queries для фильтрации
    // import { Query } from 'appwrite';
    // return await databases.listDocuments(..., [Query.equal('owner_id', userId)])
    
    // Для простоты пока просто list (с учетом прав доступа Appwrite сам отфильтрует)
    return await databases.listDocuments(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.COLLECTION_ID
    );
}