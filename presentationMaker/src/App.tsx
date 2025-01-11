import styles from './App.module.css'
import { Slide } from './views/Slide/Slide'
import { SlideList } from './views/SlidesList/SlideList'
import { Toolbar } from './views/Toolbar/Toolbar'
import { TopPanel } from './views/TopPanel/TopPanel'
import { useEffect, useState } from 'react'
import { SlideType } from './store/types'
import { useAppSelector } from './hooks/useAppSelector'

function App() {
    const slides = useAppSelector(state => state.slides) 

    const [selectedSlideId, setSelectedSlideId] = useState(slides[0].id)
    useEffect(() => {
        if (slides.length > 0) {
            setSelectedSlideId(slides[slides.length - 1].id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slides.length])

    const slide: SlideType | undefined = slides.find(s => s.id === selectedSlideId)

    const [selectedElemId, setSelectedElemId] = useState('')
    useEffect(() => {
        setSelectedElemId('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSlideId, slide?.objects.length])

    const onElemClick = (elemId: string) => {
        setSelectedElemId(elemId)     
    }
    
    const onClickSlide = (slideId: string) => {
        setSelectedSlideId(slideId)
    }
    
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
    const selectedSlide = slides.find(s => s.id === selectedSlideId)

    return (
        <div>
            <TopPanel/>
            <Toolbar 
                selectedSlideId={selectedSlideId}
                isRemoveSlideAvailable={slides.length > 1}
                selectedElemId={selectedElemId}
                selectedElemType={selectedElemType}
                selectedElemColor={selectedElemColor}
            />
            <div className={styles.slides}>
                <SlideList 
                    selectedSlideId={selectedSlideId}
                    onClickSlide={onClickSlide}
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
        </div>
    )
}

export default App