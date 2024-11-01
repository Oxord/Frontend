import { SlidePreview } from "../../components/SlidePreview/SlidePreview"
import { Presentation } from "../../store/types"
import style from './SlideList.module.css'

export type slidesListProps = {
    presentation: Presentation
}

const SlideList = ( {presentation}: slidesListProps) => {
    return (
        <div className={style.slideList}>
            {presentation.slides.map(slide =>
                <div key={slide.id} className={style.slideList__slide_prewiev}>
                    <SlidePreview
                        slide={slide}
                    />
                </div>
            )}
        </div>
    )
}

export{
    SlideList
}