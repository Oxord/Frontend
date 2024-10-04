import { Presentation } from "../../store/types"
import { SlidePreview } from "../../components/SlidePreview/SlidePreview"

export type slidesListProps = {
    presentation: Presentation
}

export const SliedList = ( {presentation}: slidesListProps) => {
    return (
        <div>
            {presentation.slides && presentation.slides.map(slide => {
            return(
                <SlidePreview slide={slide} key={slide.id}/>
            )
            })} 
        </div>
    )
}