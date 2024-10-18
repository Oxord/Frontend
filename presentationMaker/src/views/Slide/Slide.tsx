
import { CSSProperties } from "react"
import { SlideElem } from "../../components/SlideObjects/SlideElem"
import { SlideType } from "../../store/types"
const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    // isSelected: boolean,
    // className: string,
}

const Slide = ({slide, scale = 1,}: SlideProps) => {
    const slideElements = slide.objects.map(obj => {
        return (
            <SlideElem elem={obj} key={obj.id} scale={scale}/>
        )
    })
    const slideStyles:CSSProperties = {
        // backgroundColor: slide.background,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }
    return (
        <div style={slideStyles}>
            {slideElements}
        </div>
    )
}

export {
    Slide
}