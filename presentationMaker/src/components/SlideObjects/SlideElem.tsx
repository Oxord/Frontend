import { CSSProperties } from "react"
import { SlideObject } from "../../store/types"
import { ImageObject } from "./ImageObject/ImageObject"
import { Circle } from "./ImageObject/Shapes/Circle"
import { Rectangle } from "./ImageObject/Shapes/Rectangle"
import { TextObject } from "./TextObject/TextObject"
import { Triangle } from "./ImageObject/Shapes/Triangle"


type slideObjectProps = {
    elem: SlideObject
    scale: number
    isSelected: boolean
    onElemClick: () => void
    showSelection: boolean
}

export const SlideElem = ( {elem, scale, isSelected, onElemClick, showSelection}: slideObjectProps ) => {
    let figure = <></>
    const elemStyle: CSSProperties = {
        left: elem.position.X,  
        top: elem.position.Y,
    }
    if(isSelected && showSelection){
        elemStyle.border = '2.5px solid rgba(138, 180, 248, 1)'
    }
    
    switch (elem.type){
        case 'text':
            figure = <TextObject 
                        text={elem.text} 
                        font={elem.font} 
                        fontSize={elem.fontsize * scale} 
                    />
            break
        case 'image': 
            figure = <ImageObject 
                        src={elem.src} 
                        width={elem.width * scale} 
                        height={elem.height * scale} 
                    />
            break
        case 'circle':
            elemStyle.width = elem.radius * 2
            elemStyle.height = elem.radius * 2           
            figure = <Circle 
                        radius={elem.radius * scale}
                        color={elem.color}
                    />
            break
        case 'rectangle': 
            elemStyle.width = elem.width
            elemStyle.height = elem.height
            figure = <Rectangle 
                        width={elem.width * scale} 
                        height={elem.height * scale} 
                        color={elem.color} 
                    />
            break
        case 'triangle': 
            elemStyle.width = elem.width
            elemStyle.height = elem.height
            figure = <Triangle 
                        PointOne={elem.pointOne} 
                        PointTwo={elem.pointTwo} 
                        PointThree={elem.pointThree} 
                        width={elem.width * scale} 
                        height={elem.height * scale} 
                        color={elem.color}
                    />
    }
    return(
        <div style={elemStyle} onDoubleClick={onElemClick}>
            {figure}
        </div>  
    ) 
}