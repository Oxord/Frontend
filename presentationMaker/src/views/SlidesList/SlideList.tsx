import { SlidePreview } from "../../components/SlidePreview/SlidePreview"
import { Presentation, SlideType } from "../../store/types"
import style from './SlideList.module.css'

export type slidesListProps = {
    presentation: Presentation
    selectedSlideId: string
    onChangeSlide: (slideId: string) => void
    onChangeSlidePosition: (newOrder: string[]) => void
    selectedElemId: string
    onElemClick?: (objId: string) => void
}

const SlideList = ( {presentation, selectedSlideId, onChangeSlide, selectedElemId, onChangeSlidePosition}: slidesListProps ) => {   
    
    let newOrder: string[] = presentation.slides.map(slideId => slideId.id)
    let draggedSlideId: string

    function onDragStart(slide: SlideType) {
        draggedSlideId = slide.id
    }

    function onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
    }

    function onDrop(event: React.DragEvent<HTMLDivElement>, slide: SlideType) {

        event.preventDefault()
        console.log('dropped')
        const indexOfDraggedSlideId = newOrder.indexOf(draggedSlideId)
        newOrder = newOrder.filter(id => id !== draggedSlideId)
        const indexOfSlideId = newOrder.indexOf(slide.id)
        
        if (indexOfDraggedSlideId === indexOfSlideId + 1) {
            newOrder.splice(indexOfSlideId, 0, draggedSlideId)
        }
        else {
            newOrder.splice(indexOfSlideId + 1, 0, draggedSlideId)
        }        

        onChangeSlidePosition(newOrder) 
    }

    return (
        <div className={style.slideList}>
            {presentation.slides.map(slide =>
                <div key={slide.id} 
                    className={style.slideList__slide_prewiev} 
                    onClick={() => onChangeSlide(slide.id)}
                    draggable={true}
                    onDragStart={() => onDragStart(slide)}
                    onDragOver={(event: React.DragEvent<HTMLDivElement>) => onDragOver(event)}                
                    onDrop={(event: React.DragEvent<HTMLDivElement>) => onDrop(event, slide)}
                >
                    <SlidePreview
                        slide={slide}
                        isSelected={slide.id == selectedSlideId}
                        selectedElemId={selectedElemId}
                    />
                </div>
            )}
        </div>
    )
}

export{
    SlideList
}