import { SlideObject } from "../../store/types"
import { Circle } from "./Circle/Circle"
import { ImageObject } from "./ImageObject/ImageObject"
import { Rectangle } from "./Rectangle/Rectangle"
import { TextObject } from "./TextObject/TextObject"
import { Triangle } from "./Triangle/Triangle"

type slideObjectProps = {
    elem: SlideObject
}

export const SlideElem = ( {elem}: slideObjectProps ) => {
    switch (elem.type){
        case 'text':
            return (
                <div style={{left: elem.position.X,  top: elem.position.Y}} >
                    <TextObject text={elem.text} font={elem.font} fontSize={elem.fontsize}/>
                </div>
            )
        case 'image': 
            return(
                <div style={{left: elem.position.X,  top: elem.position.Y}}>
                    <ImageObject src={elem.src} width={elem.width} height={elem.height}/>
                </div>
            )
        case 'circle': 
            return(
                <div style={{left: elem.position.X,  top: elem.position.Y}}>
                    <Circle radius={elem.radius}/>
                </div>
            )
        case 'rectangle': 
            return(
                <div style={{left: elem.position.X,  top: elem.position.Y}}>
                    <Rectangle length={elem.width} height={elem.height}/>
                </div>
            )
        case 'triangle': 
            return(
                <div style={{left: elem.position.X,  top: elem.position.Y}}>
                    <Triangle/>
                </div>
            )   
    }
}