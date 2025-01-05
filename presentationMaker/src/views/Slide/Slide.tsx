import { CSSProperties, useRef, useState } from "react"
import { SlideElem } from "../../components/SlideObjects/SlideElem"
import { SlideType } from "../../store/types"

type SlideProps = {
    slide: SlideType,
    scale: number,
    width?: number,
    height?: number,
    isSelected: boolean | null,
    showSelection: boolean,
    selectedElemId: string
    onElemClick: (objId: string) => void
    onChangeSlideObjectPosition: () => void
    onChangeSlideObjectSize: () => void
} 

const Slide = ({slide, scale, width, height, isSelected, showSelection, onElemClick, selectedElemId, onChangeSlideObjectPosition, onChangeSlideObjectSize}: SlideProps) => {
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

    const slideRef = useRef<HTMLDivElement>(null)

    const [isPointActive, setPointActive] = useState(false)

    const slideElements = slide.objects.map(obj => {
        if (obj){
            return (
                <div onMouseDown={() => onElemClick(obj.id)}>
                    <SlideElem 
                        elem={obj} 
                        key={obj.id} 
                        // scale={scale} 
                        isSelected={selectedElemId === obj.id} 
                        // onElemClick={() => onElemClick(obj.id)} 
                        showSelection={showSelection}
                        onChangeSlideObjectPosition={onChangeSlideObjectPosition}
                        onChangeSlideObjectSize={onChangeSlideObjectSize}
                        slideRef={slideRef}
                        isPointActive={isPointActive}
                    />
                </div>   
            )
        }
    })
    return (
        <div style={slideStyle} ref={slideRef}
            onMouseDown={() => setPointActive(true)}
            onMouseUp={() => setPointActive(false)}
        >
            {slideElements}
        </div>
    )
}

export {
    Slide
}