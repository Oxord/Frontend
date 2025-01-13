import { SlideType } from "../../store/types"
import { Slide } from "../../views/Slide/Slide";

export type slidePreviewProps = {
    slide: SlideType
    isSelected: boolean
    selectedElemId: string
    onElemClick?: (objId: string) => void
}

const scale = 0.2  
const SLIDE_HEIGHT = 525
const SLIDE_WIDTH = 900

export const SlidePreview = ({slide, isSelected, selectedElemId}: slidePreviewProps ) => {
    return (
        <Slide 
            slide={slide} 
            scale={scale} 
            width={SLIDE_WIDTH * scale} 
            height={SLIDE_HEIGHT * scale} 
            isSelected={isSelected} 
            showSelection={false} 
            selectedElemId={selectedElemId}
            onElemClick={() => {}} 
        />
    )
}