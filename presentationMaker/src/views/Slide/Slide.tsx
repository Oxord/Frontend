import { CSSProperties } from "react"
import { SlideElem } from "../../components/SlideObjects/SlideElem"
import { SlideType } from "../../store/types"

type SlideProps = {
    slide: SlideType,
    scale: number,
    width?: number,
    height?: number,
    isSelected: boolean | null,
    showSelection: boolean,
    selectedElemsId: string[]
    onElemClick: (objId: string) => void
} 

const Slide = ({slide, scale, width, height, isSelected, showSelection, onElemClick, selectedElemsId}: SlideProps) => {
    const slideStyle: CSSProperties = {
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '100%',
        width: `${width}px`,
        height: `${height}px`,
        'transform': `scale(${scale})`,
    }
    if (slide.background.type === 'image') {
        slideStyle.backgroundImage = `url(${slide.background.src})`
        slideStyle.backgroundSize = 'cover'
        slideStyle.backgroundPosition = 'center'
    }
    else{
        slideStyle.backgroundColor = slide.background.color
        slideStyle.backgroundSize = 'contain'
    }
    if(isSelected){
        slideStyle.border = '2px solid red'
    }

    const slideElements = slide.objects.map(obj => {
        if (obj){
            return (
                <SlideElem 
                    elem={obj} 
                    key={obj.id} 
                    // scale={scale} 
                    isSelected={selectedElemsId? selectedElemsId.includes(obj.id): false} 
                    onElemClick={() => onElemClick(obj.id)} 
                    showSelection={showSelection}
                />
            )
        }
    })
    return (
        <div style={slideStyle}>
            {slideElements}
        </div>
    )
}

export {
    Slide
}