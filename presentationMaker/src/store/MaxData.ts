import { generateGuid } from "./actions"
import { EditorType } from "./EditorType"
import { Circle, ImageObject, Presentation, Reactangle, SlideType, TextObject, Triangle } from "./types"

const TEXT_OBJ: TextObject = {
    id: generateGuid(), 
    position: {X: 0, Y: 0}, 
    text: 'textObj', 
    font: 'fantasy',
    fontsize: 16,
    type: 'text' 
}
const IMG_OBJ: ImageObject = {
    id: generateGuid(),
    position: {X: 150, Y: 150},
    src: 'https://media.licdn.com/dms/image/v2/D4E12AQFyZaPBHc_7bA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705229834365?e=2147483647&v=beta&t=4U3KzLzxygWDJ-Y14qEilcL3dZ_jnDwtVgRMrceBMhg',
    width: 200, 
    height: 200,
    type: 'image'
}
const CIRCLE_OBJ: Circle = {
    id: generateGuid(),
    position: {X: 350, Y: 350},
    color: 'blue',
    radius: 20,
    type: 'circle'
}
const RECT_OBJ: Reactangle = {
    id: generateGuid(),
    position: {X: 350, Y: 350},
    color: 'red',
    width: 10,
    height: 15,
    type: 'rectangle'
}
const TRIANGLE_OBJ: Triangle = {
    id: generateGuid(),
    position: {X: 50, Y: 50},
    color: 'red',
    pointOne: {X: 0, Y: 44},
    pointTwo: {X: 22, Y: 4},
    pointThree: {X: 44, Y: 44},
    width: 45,
    height: 45,
    type: 'triangle'
}
const FIRST_SLIDE: SlideType = {
    id: generateGuid(),
    background:  {
        src: 'https://i.ytimg.com/vi/4Sr9RJkVeIg/hqdefault.jpg',
        type: 'image'
    },
    objects: [TEXT_OBJ, IMG_OBJ, CIRCLE_OBJ, RECT_OBJ, TRIANGLE_OBJ],
    selectedObjectIds: [TEXT_OBJ.id, IMG_OBJ.id]
}
const SECOND_SLIDE: SlideType = {
    id: '361a7d46-e882-4d8d-9353-66d90c57d157',//generateGuid(),
    background: {
        color: 'white',
        type: 'solid'
    },
    objects: [TEXT_OBJ, CIRCLE_OBJ, RECT_OBJ],
    selectedObjectIds: [CIRCLE_OBJ.id, RECT_OBJ.id]
}
const PRESENTATION: Presentation = {
    name: 'PresName', 
    slides: [FIRST_SLIDE, SECOND_SLIDE], 
    selectedSlideIds: [SECOND_SLIDE.id, FIRST_SLIDE.id]
}
const NEW_SLIDE: SlideType = {
    id: generateGuid(),
    background: {
        color: 'white',
        type: 'solid'
    },
    objects: [],
    selectedObjectIds: []
}

const editor: EditorType = {
    presentation: PRESENTATION,
}

export {
    PRESENTATION, 
    NEW_SLIDE,
    SECOND_SLIDE,
    FIRST_SLIDE,
    RECT_OBJ,
    IMG_OBJ,
    TEXT_OBJ,
    CIRCLE_OBJ, 
    TRIANGLE_OBJ,
    editor
}