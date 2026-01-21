import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateState } from '../../store/ValidateState';
import { useAppActions } from '../../hooks/useAppActions';
import style from './PresentationList.module.css';
import { Models } from 'appwrite';
import { deletePresentationFromCloud, getUserPresentations } from '../../services/appwrite/service';

type Props = {
    onClose: () => void
    onSelect: (id: string) => void
    onCreateNew: () => void
}

export const PresentationList = ({ onClose, onSelect, onCreateNew }: Props) => {
    const { user } = useAuth();
    const { updateSlides, changePresentationTitle } = useAppActions();
    const [docs, setDocs] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const loadData = async () => {
        if (!user) return;
        try {
            const res = await getUserPresentations(user.$id);
            setDocs(res.documents);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadPresentation = (doc: Models.Document) => {
        const validatedData = validateState(doc.data);
        if (validatedData) {
            updateSlides(validatedData.slides);
            changePresentationTitle(validatedData.title);
            
            onSelect(doc.$id);
            
            onClose();
        } else {
            alert("Ошибка: Некорректный формат презентации");
        }
    };

    const handleDelete = async (e: React.MouseEvent, docId: string) => {
        e.stopPropagation();
        if (confirm('Вы уверены, что хотите удалить эту презентацию?')) {
            await deletePresentationFromCloud(docId);
            loadData();
        }
    };

    const handleCreateNew = () => {
        if (confirm('Создать новую презентацию? Несохраненные изменения в текущей будут потеряны.')) {
            onCreateNew();
            onClose();
        }
    }

    // if (loading) return <div className={style.empty}>Loading...</div>;

    return (
        <div className={style.listContainer}>
            <div className={style.createItem} onClick={handleCreateNew}>
                <span className={style.createTitle}>+ Create New Presentation</span>
            </div>
            {docs.length === 0 ? (
                <div className={style.empty}>Нет сохраненных презентаций</div>
            ) : (
                docs.map(doc => {
                    let title = "Untitled Presentation";
                    try {
                        const parsed = JSON.parse(doc.data);
                        if (parsed.title) title = parsed.title;
                    } catch (e) {}

                    return (
                        <div key={doc.$id} className={style.item} onClick={() => handleLoadPresentation(doc)}>
                            <div className={style.itemInfo}>
                                <span className={style.title}>{title}</span>
                                <span className={style.date}>
                                    {new Date(doc.$updatedAt).toLocaleString()}
                                </span>
                            </div>
                            <button className={style.deleteBtn} onClick={(e) => handleDelete(e, doc.$id)}>
                                Delete
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
};