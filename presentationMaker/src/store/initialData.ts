import { generateGuid } from "./actions"
import { EditorType } from "./EditorType"
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
}
const PRESENTATION: Presentation = {
    name: 'NAME', 
    slides: [NEW_SLIDE], 
}

const editor: EditorType = {
    presentation: PRESENTATION,
}
export {
    editor
}