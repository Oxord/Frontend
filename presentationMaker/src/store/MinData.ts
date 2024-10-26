import { generateGuid } from "./actions"
import { Presentation, SlideType, SolidBackground } from "./types"

const newSlideId = generateGuid()
const background: SolidBackground = {
    color: 'white',
    type: 'solid'
}
const newSlide: SlideType = {
    id: newSlideId,
    background,
    objects: [],
    selectedObjectIds: []
}
const presentation: Presentation = {
    name: 'PresName', 
    slides: [newSlide], 
    selectedSlideIds: []
}
export {
    presentation,
    newSlide,
    newSlideId
}