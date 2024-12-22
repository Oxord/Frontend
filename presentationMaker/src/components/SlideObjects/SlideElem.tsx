import { CSSProperties } from "react"
import { SlideObject } from "../../store/types"
import { ImageObject } from "./ImageObject/ImageObject"
import { Circle } from "./ImageObject/Shapes/Circle"
import { Rectangle } from "./ImageObject/Shapes/Rectangle"
import { TextObject } from "./TextObject/TextObject"
import { Triangle } from "./ImageObject/Shapes/Triangle"


type slideObjectProps = {
    elem: SlideObject
    isSelected: boolean
    onElemClick: () => void
    showSelection: boolean
}

export const SlideElem = ( {elem, isSelected, onElemClick, showSelection}: slideObjectProps ) => {
    let figure = <></>
    const elemStyle: CSSProperties = {
        left: elem.position.X,  
        top: elem.position.Y,
        position: 'absolute'
    }

    if(isSelected && showSelection){
        elemStyle.border = '2.5px solid rgba(138, 180, 248, 1)'
    }
    switch (elem.type){
        case 'text':
            figure = <TextObject 
                        text={elem.text} 
                        font={elem.font} 
                        fontSize={elem.fontsize * 1} 
                        isReadOnly={!isSelected}
                        elemId={elem.id}
                    />
            break
        case 'image': 
            figure = <ImageObject 
                        src={elem.src} 
                        width={elem.width * 1} 
                        height={elem.height * 1} 
                    />
            break
        case 'circle':
            elemStyle.width = elem.radius * 2
            elemStyle.height = elem.radius * 2           
            figure = <Circle 
                        radius={elem.radius * 1}
                        color={elem.color}
                    />
            break
        case 'rectangle': 
            elemStyle.width = elem.width
            elemStyle.height = elem.height
            figure = <Rectangle 
                        width={elem.width * 1} 
                        height={elem.height * 1} 
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
                        width={elem.width * 1} 
                        height={elem.height * 1} 
                        color={elem.color}
                    />
    }

    // if(isSelected){
        
    // }

    return(
        <div style={elemStyle} onClick={onElemClick} onChange={()=>{}}>
            {figure}
        </div>  
    ) 
}