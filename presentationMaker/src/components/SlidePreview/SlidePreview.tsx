import { Slide } from "../../store/types"

export type slidePreviewProps = {
    slide: Slide
}

export const SlidePreview = ({slide}: slidePreviewProps ) => {
    return (
        <div>{slide.id}</div>
        //скорее всего возвращаем то же, что и в WorkingArea, только уменьшенное
    )
}