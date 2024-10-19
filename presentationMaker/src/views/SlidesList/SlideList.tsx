import { Presentation } from "../../store/types"
import { Slide } from "../Slide/Slide"

export type slidesListProps = {
    presentation: Presentation
}

const SLIDE_PREVIEW_SCALE = 0.2

const SliedList = ( {presentation}: slidesListProps) => {
    return (
        <div>
            {presentation.slides.map(slide =>
                <div key={slide.id}>
                    <Slide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                    ></Slide>
                </div>
            )}
        </div>
    )
}

export{
    SliedList
}