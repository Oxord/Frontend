import { CSSProperties, useState } from "react"
import { SlideElem } from "../../components/SlideObjects/SlideElem"
import { SlideType } from "../../store/types"

type SlideProps = {
    slide: SlideType,
    scale: number,
    width?: number,
    height?: number,
    isSelected: boolean | null,
    showSelection: boolean,
} 

const Slide = ({slide, scale, width, height, isSelected, showSelection}: SlideProps) => {
    const slideStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxWidth: '100%',
        maxHeight: '100%',
        width: `${width}px`,
        height: `${height}px`,
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
    const [selectedElems, setSelectedElems] = useState(slide.selectedObjectIds)

    const onElemClick = (elemId: string) => {
        if (selectedElems.includes(elemId)){
            setSelectedElems( selectedElems.filter(e => e !== elemId) )
        }
        else{
            setSelectedElems( [...selectedElems,  elemId] )
        }
    }

    const slideElements = slide.objects.map(obj => {
        if (obj){
            return (
                <SlideElem 
                    elem={obj} 
                    key={obj.id} 
                    scale={scale} 
                    isSelected={selectedElems.includes(obj.id)} 
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