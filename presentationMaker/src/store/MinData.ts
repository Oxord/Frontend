import { generateGuid } from "./actions"
import { Presentation, SlideType, SolidBackground } from "./types"

const NEW_SLIDE_ID = generateGuid()
const background: SolidBackground = {
    color: 'white',
    type: 'solid'
}
const NEW_SLIDE: SlideType = {
    id: NEW_SLIDE_ID,
    background,
    objects: [],
    selectedObjectIds: []
}
const PRESENTATION: Presentation = {
    name: 'PresName', 
    slides: [NEW_SLIDE], 
    selectedSlideIds: []
}
export {
    PRESENTATION,
    NEW_SLIDE,
    NEW_SLIDE_ID
}