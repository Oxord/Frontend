import { SlideType } from "../../store/types"
import { Slide } from "../../views/Slide/Slide";

export type slidePreviewProps = {
    slide: SlideType
    isSelected: boolean
}

const scale = 0.2;

export const SlidePreview = ({slide, isSelected}: slidePreviewProps ) => {
    return (
        <Slide slide={slide} scale={scale} width={200} height={145} isSelected={isSelected} showSelection={false}/>
    )
}