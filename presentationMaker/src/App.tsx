import styles from './App.module.css'
import { Slide } from './views/Slide/Slide'
import { SlideList } from './views/SlidesList/SlideList'
import { Toolbar } from './views/Toolbar/Toolbar'
import { TopPanel } from './views/TopPanel/TopPanel'
import { useEffect, useState } from 'react'
import { SlideType } from './store/types'
import { useAppSelector } from './hooks/useAppSelector'
import { HistoryType } from './store/history'
import { HistoryContext } from './hooks/historyContext'
import { useAppActions } from './hooks/useAppActions'
import { useAuth } from './hooks/useAuth'
import Auth from './views/Auth/Auth'
import Preloader from './views/Preloader/Preloader'
import { useDebounce } from './hooks/useDebounce'
import { getUserPresentations, savePresentationToCloud } from './services/appwrite/service'

type AppProprs = {
    history: HistoryType
}

function App({history}: AppProprs) {
    const { user, loading } = useAuth()

    const fullState = useAppSelector(state => state)
    const debouncedState = useDebounce(fullState, 2000)
    const [cloudDocId, setCloudDocId] = useState<string | undefined>(undefined)
    const [isSaving, setIsSaving] = useState(false)
    useEffect(() => {
        if (user) {
            getUserPresentations(user.$id).then(res => {
                if (res.documents.length > 0) {
                    setCloudDocId(res.documents[0].$id)
                    // Тут можно было бы сделать dispatch(updateSlides(JSON.parse(res.documents[0].data)))
                    // чтобы загрузить данные с сервера
                }
            })
        }
    }, [user])

    useEffect(() => {
        const saveData = async () => {
            if (!user || !debouncedState) return
            
            setIsSaving(true)
            try {
                const response = await savePresentationToCloud(user.$id, debouncedState, cloudDocId)
                // Если это был новый документ, запоминаем его ID
                if (!cloudDocId) {
                    setCloudDocId(response.$id)
                }
                console.log("Auto-saved to Appwrite at " + new Date().toLocaleTimeString())
            } catch (error) {
                console.error("Auto-save error", error)
            } finally {
                setIsSaving(false)
            }
        }

        saveData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedState]) // Срабатывает только когда меняется debounced версия стейта

    const slides = useAppSelector(state => state.slides) 

    const [selectedSlidesIds, setSelectedSlidesIds] = useState<string[]>([slides[0].id])
    useEffect(() => {
        if (slides.length > 0) {
            setSelectedSlidesIds([slides[slides.length - 1].id])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slides.length])

    const slide: SlideType | undefined = slides.find(s => s.id === selectedSlidesIds[0])

    const [selectedElemId, setSelectedElemId] = useState('')
    useEffect(() => {
        setSelectedElemId('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSlidesIds, slide?.objects.length])

    const onElemClick = (elemId: string) => {
        setSelectedElemId(elemId)     
    }
    
    const onClickSlide = (slideId: string) => {
        setSelectedSlidesIds([slideId])
    }

    const onClickSlideWithCtrl = (slideId: string) => {
        setSelectedSlidesIds([...selectedSlidesIds, slideId])
    }
    
    const { changePresentationTitle, updateSlides } = useAppActions()
    function onUndo() {
        const newState = history.undo()
        if (newState) {
            changePresentationTitle(newState.title)
            updateSlides(newState.slides)
        }
    }
    function onRedo() {
        const newState = history.redo()
        if (newState) {
            changePresentationTitle(newState.title)
            updateSlides(newState.slides)
        }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === 'z' && (event.ctrlKey || event.metaKey)) {
            onUndo()
        }
        if (event.key.toLowerCase() === 'y' && (event.ctrlKey || event.metaKey)) {
            onRedo()
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])


    let selectedElemType = ''
    let selectedElemColor = ''
    if (selectedElemId) {
        const selectedElem = slide?.objects.find(o => o.id === selectedElemId)
        if ( selectedElem && selectedElem.type !== 'image') {
            selectedElemType = selectedElem.type
            selectedElemColor = selectedElem.color
        }
    }
    
    const SLIDE_WIDTH = 950
    const SLIDE_HEIGHT = 525
    const selectedSlide = slides.find(s => s.id === selectedSlidesIds[0])

    // if (loading) {
    //     return <Preloader />
    // }

    if (!user) {
        return <Auth />
    }

    return (  
        <div className='main'>
            {/* Можно добавить индикатор сохранения */}
            <div style={{position: 'fixed', bottom: 10, right: 10, opacity: 0.5, fontSize: 12}}>
                {isSaving ? "Saving..." : "All changes saved"}
            </div>
            <HistoryContext.Provider value={history}>
                <TopPanel
                    onUndo={onUndo}
                    onRedo={onRedo}
                />
                <Toolbar 
                    selectedSlideId={selectedSlidesIds[0]}
                    isRemoveSlideAvailable={slides.length > 1}
                    selectedElemId={selectedElemId}
                    selectedElemType={selectedElemType}
                    selectedElemColor={selectedElemColor}
                />
                <div className={styles.slides}>
                    <SlideList 
                        selectedSlidesIds={selectedSlidesIds}
                        onClickSlide={onClickSlide}
                        onClickSlideWithCtrl={onClickSlideWithCtrl}
                        selectedElemId={selectedElemId}
                    />
                    {selectedSlide &&
                    <div className={styles.slides__workArea}>
                        <Slide slide={selectedSlide} 
                            scale={1} 
                            width={SLIDE_WIDTH} 
                            height={SLIDE_HEIGHT} 
                            isSelected={null}
                            showSelection={true}
                            onElemClick={onElemClick}
                            selectedElemId={selectedElemId}
                        />
                    </div>}
                </div>
            </HistoryContext.Provider>
        </div>
    )
}

export default App