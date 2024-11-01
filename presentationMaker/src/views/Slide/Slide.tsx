import { CSSProperties } from "react"
import { SlideElem } from "../../components/SlideObjects/SlideElem"
import { SlideType } from "../../store/types"

type SlideProps = {
    slide: SlideType,
    scale: number,
    width?: number,
    height?: number,
}

const Slide = ({slide, scale, width, height}: SlideProps) => {
    let slideStyle: CSSProperties
    if (slide.background.type === 'image') {
        slideStyle = {
            display: 'block',
            backgroundImage: `url(${slide.background.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '100%',
            maxHeight: '100%',
            width: `${width}px`,
            height: `${height}px`,
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
        }
    }
    else{
        slideStyle = {
            display: 'block',
            backgroundColor: slide.background.color,
            backgroundSize: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: `${width}px`,
            height: `${height}px`,
        }
    }
    const slideElements = slide.objects.map(obj => {
        if (obj){
            return (
                <SlideElem elem={obj} key={obj.id} scale={scale}/>
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