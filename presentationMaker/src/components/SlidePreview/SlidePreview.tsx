import { SlideType } from "../../store/types"
import { Slide } from "../../views/Slide/Slide";

export type slidePreviewProps = {
    slide: SlideType
    isSelected: boolean
    selectedElemsId: string[]
    onElemClick?: (objId: string) => void
}

const scale = 180 / 950;  
const SLIDE_WIDTH = 950
const SLIDE_HEIGHT = 525

export const SlidePreview = ({slide, isSelected, selectedElemsId}: slidePreviewProps ) => {
    return (
        <Slide 
            slide={slide} 
            scale={scale} 
            width={SLIDE_WIDTH} 
            height={SLIDE_HEIGHT} 
            isSelected={isSelected} 
            showSelection={false} 
            selectedElemsId={selectedElemsId}
            onElemClick={() => {}} 
        />
    )
}