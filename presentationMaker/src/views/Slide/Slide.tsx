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
    onElemClick: (elemId: string) => void
} 

const Slide = ({slide, scale, width, height, isSelected, showSelection, onElemClick, selectedElemId }: SlideProps) => {
    const slideStyle: CSSProperties = {
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '100%',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden'
    }
    if (slide.background.type === 'image') {
        slideStyle.backgroundImage = `url(${slide.background.src})`
        slideStyle.backgroundSize = 'cover'
        slideStyle.backgroundPosition = 'center'
    }
    if (slide.background.type === 'gradient') {
        slideStyle.background = `linear-gradient(to ${slide.background.gradientType}, ${slide.background.color1}, ${slide.background.color2})`
    }
    if(slide.background.type === 'solid') {
        slideStyle.backgroundColor = slide.background.color
        slideStyle.backgroundSize = 'contain'
    }
    if(isSelected){
        slideStyle.border = '2px solid red'
    }

    const slideRef = useRef<HTMLDivElement>(null)

    const [isResizePointActive, setIsResizePointActive] = useState(false)

    const changeIsResizePointActive = () => {
        setIsResizePointActive(!isResizePointActive)
    }

    const slideElements = slide.objects.map(elem => {
        if (elem){
            return (
                <div onMouseDown={() => onElemClick(elem.id)}
                    className="slide-element"
                >
                    <SlideElem 
                        elem={elem} 
                        key={elem.id} 
                        slideId={slide.id}
                        scale={scale} 
                        isSelected={selectedElemId === elem.id} 
                        showSelection={showSelection}
                        slideRef={slideRef}
                        isResizePointActive={isResizePointActive}
                    />
                </div>   
            )
        }
    })
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.slide-element')) {
            onElemClick('')
        }
    }
    return (
        <div style={slideStyle} ref={slideRef}
            onMouseDown={handleMouseDown}
            onMouseUp={changeIsResizePointActive}
        >
            {slideElements}
        </div>
    )
}

export {
    Slide
}