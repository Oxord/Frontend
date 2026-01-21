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
}

export const PresentationList = ({ onClose }: Props) => {
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
        // Парсим и валидируем данные из облака
        const validatedData = validateState(doc.data);
        if (validatedData) {
            updateSlides(validatedData.slides);
            changePresentationTitle(validatedData.title);
            // Важно: здесь нужно обновить ID текущего документа в App.tsx, 
            // чтобы автосохранение писало в этот же файл, а не создавало новый.
            // Но пока у нас нет прямого доступа к setCloudDocId из этого компонента.
            // Мы решим это через перезагрузку страницы с query-параметром или через Context,
            // но для простоты просто загрузим данные в редактор.
            onClose();
        } else {
            alert("Ошибка: Некорректный формат презентации");
        }
    };

    const handleDelete = async (e: React.MouseEvent, docId: string) => {
        e.stopPropagation(); // Чтобы не сработал клик по элементу
        if (confirm('Вы уверены, что хотите удалить эту презентацию?')) {
            await deletePresentationFromCloud(docId);
            loadData(); // Обновляем список
        }
    };

    if (loading) return <div className={style.empty}>Loading...</div>;

    return (
        <div className={style.listContainer}>
            {docs.length === 0 ? (
                <div className={style.empty}>Нет сохраненных презентаций</div>
            ) : (
                docs.map(doc => {
                    // Пытаемся достать название из JSON внутри, либо используем дату
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