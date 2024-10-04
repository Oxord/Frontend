import { SlideObject } from "../../store/types"

type slideObjectProps = {
    elem: SlideObject
}

export const SlideElem = ( {elem}: slideObjectProps ) => {
    switch (elem.type){
        case 'text':
            return (
                <div>
                    <p style={{font: elem.font, fontSize: elem.fontsize}}>
                        {elem.text}
                    </p>
                </div>
            )
        case 'image': 
            return(
                <div>
                    <img src={elem.src} style={{width: elem.width, height: elem.height} }></img>
                </div>
            )
        case 'circle': 
            return(
                <div>
                    <div style={{borderRadius: elem.radius} }></div>
                </div>
            )
        case 'rectangle': 
            return(
                <div>
                    <div style={{width: elem.length, height: elem.width} }></div>
                </div>
            )
        case 'triangle': 
            return(
                <div>
                    <div></div>
                </div>
            )
        
    }
}