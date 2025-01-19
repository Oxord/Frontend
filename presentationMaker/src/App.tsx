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

type AppProprs = {
    history: HistoryType
}

function App({history}: AppProprs) {
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
    return (    
        <div className='main'>
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