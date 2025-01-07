import { generateGuid } from "./actions"
import { SlideType, SolidBackground } from "./types"

const NEW_SLIDE_ID = generateGuid()
const background: SolidBackground = {
    color: 'white',
    type: 'solid'
}
const NEW_SLIDE: SlideType = {
    id: NEW_SLIDE_ID,
    background,
    objects: [],
}

export const initialData = {
    title: 'untitled',
    slides: [NEW_SLIDE]
}
