import { SlideObject } from "../../store/types"
import { ImageObject } from "./ImageObject/ImageObject"
import { Circle } from "./Shapes/Circle"
import { Rectangle } from "./Shapes/Rectangle"
import { Triangle } from "./Shapes/Triangle"
import { TextObject } from "./TextObject/TextObject"


type slideObjectProps = {
    elem: SlideObject
    scale: number
}

export const SlideElem = ( {elem, scale}: slideObjectProps ) => {
    let figure = <></>;

    switch (elem.type){
        case 'text':
            figure = <TextObject text={elem.text} font={elem.font} fontSize={elem.fontsize * scale}/>
            break
        case 'image': 
            figure = <ImageObject src={elem.src} width={elem.width * scale} height={elem.height * scale}/>
            break
        case 'circle': 
            figure = <Circle radius={elem.radius * scale}/>
            break
        case 'rectangle': 
            figure = <Rectangle width={elem.width * scale} height={elem.height * scale}/>
            break
        case 'triangle': 
            figure = <Triangle PointOne={elem.pointOne} PointTwo={elem.pointTwo} PointThree={elem.pointThree}/>
    }
    return(
        <div style={{left: elem.position.X,  top: elem.position.Y}}>
            {figure}
        </div>  
    ) 
}