import { SlidePreview } from "../../components/SlidePreview/SlidePreview"
import { useAppActions } from "../../hooks/useAppActions"
import { useAppSelector } from "../../hooks/useAppSelector"
import { SlideType } from "../../store/types"
import style from './SlideList.module.css'

export type slidesListProps = {
    selectedSlidesIds: string[]
    onClickSlide: (slideId: string) => void
    onClickSlideWithCtrl: (slideId: string) => void
    selectedElemId: string
}

const SlideList = ( {selectedSlidesIds, onClickSlide, onClickSlideWithCtrl, selectedElemId}: slidesListProps ) => {  
    
    const slides = useAppSelector(state => state.slides)

    const { changeSlidePosition } = useAppActions()
    let newOrder: string[] = slides.map(slideId => slideId.id)
    const draggedSlideIds: string[] = selectedSlidesIds
    const onDragStart = (slide: SlideType) => {
        if (!draggedSlideIds.includes(slide.id))
            draggedSlideIds.push(slide.id)
    }
    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }
    const onDrop = (event: React.DragEvent<HTMLDivElement>, slide: SlideType) => {
        event.preventDefault()
        draggedSlideIds.forEach(slideId => {
            const indexOfDraggedSlideId = newOrder.indexOf(slideId)
            newOrder = newOrder.filter(id => id !== slideId)
            
            const indexOfSlideId = newOrder.indexOf(slide.id)
            
            if (indexOfDraggedSlideId === indexOfSlideId + 1) {
                newOrder.splice(indexOfSlideId, 0, slideId)
            } else {
                newOrder.splice(indexOfSlideId + 1, 0, slideId)
            }
        })
        
        changeSlidePosition(newOrder) 
    }

    
    const handleClickOnSlidePreview = (event: React.MouseEvent<HTMLDivElement>, slideId: string) => {
        if (event.ctrlKey) {
            onClickSlideWithCtrl(slideId)
        }
        else {
            onClickSlide(slideId)
        }
    }

    return (
        <div className={style.slideList}>
            {slides.map(slide =>
                <div key={slide.id} 
                    className={style.slideList__slide_prewiev} 
                    onClick={event => handleClickOnSlidePreview(event, slide.id)}
                    draggable={true}
                    onDragStart={() => onDragStart(slide)}
                    onDragOver={(event: React.DragEvent<HTMLDivElement>) => onDragOver(event)}                
                    onDrop={(event: React.DragEvent<HTMLDivElement>) => onDrop(event, slide)}
                >
                    <SlidePreview
                        slide={slide}
                        isSelected={selectedSlidesIds.includes(slide.id)}
                        selectedElemId={selectedElemId}
                    />
                </div>
            )}
        </div>
    )
}

export { 
    SlideList
} 