import { SlidePreview } from "../../components/SlidePreview/SlidePreview"
import { Presentation, SlideType } from "../../store/types"
import style from './SlideList.module.css'

export type slidesListProps = {
    presentation: Presentation
    selectedSlideId: string
    onSendData: (slide: SlideType) => void
}

const SlideList = ( {presentation, selectedSlideId, onSendData}: slidesListProps ) => {    
    return (
        <div className={style.slideList}>
            {presentation.slides.map(slide =>
                <div key={slide.id} className={style.slideList__slide_prewiev} onClick={() => onSendData(slide)}>
                    <SlidePreview
                        slide={slide}
                        isSelected={slide.id == selectedSlideId}
                    />
                </div>
            )}
        </div>
    )
}

export{
    SlideList
}