import { Slide } from "../../store/types"
import { SlideElem } from "../SlideObjects/SlideElem"

type workingAreaProps = {
    slide: Slide
}

export const WorkingArea = ({ slide }: workingAreaProps) => {
    //определяем модификатор класса компонента в зависимости от slide.background
    return(
        <div className="">
            {slide.objects && slide.objects.map(obj => {
                return (
                    <SlideElem elem={obj} key={obj.id}/>
                )
            })}            
        </div>
    )
}