import { SlideType } from "../../store/types"
import { Slide } from "../../views/Slide/Slide";

export type slidePreviewProps = {
    slide: SlideType
}

const scale = 0.2;

export const SlidePreview = ({slide}: slidePreviewProps ) => {
    return (
        <Slide slide={slide} scale={scale} width={200} height={145}/>
    )
}