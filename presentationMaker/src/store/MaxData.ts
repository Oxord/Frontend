import { generateGuid } from "./actions"
import { Circle, ImageObject, Presentation, Reactangle, SlideType, TextObject, Triangle } from "./types"

const TEXT_OBJ: TextObject = {
    id: generateGuid(), 
    position: {X: 0, Y: 0}, 
    text: 'textObj', 
    font: 'arial',
    fontsize: 16,
    type: 'text' 
}
const IMG_OBJ: ImageObject = {
    id: generateGuid(),
    position: {X: 150, Y: 150},
    src: 'src',
    width: 200, 
    height: 200,
    type: 'image'
}
const CIRCLE_OBJ: Circle = {
    id: generateGuid(),
    position: {X: 350, Y: 350},
    color: 'red',
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
    position: {X: 350, Y: 350},
    color: 'red',
    pointOne: {X: 370, Y: 370},
    pointTwo: {X: 420, Y: 270},
    pointThree: {X: 270, Y: 270},
    type: 'triangle'
}
const FIRST_SLIDE: SlideType = {
    id: generateGuid(),
    background:  {
        color: 'white',
        type: 'solid'
    },
    objects: [TEXT_OBJ, IMG_OBJ, CIRCLE_OBJ, RECT_OBJ, TRIANGLE_OBJ],
    selectedObjectIds: [TEXT_OBJ.id, IMG_OBJ.id]
}
const SECOND_SLIDE: SlideType = {
    id: generateGuid(),
    background:  {
        src: 'src',
        type: 'image'
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

export {
    PRESENTATION, 
    NEW_SLIDE,
    SECOND_SLIDE,
    FIRST_SLIDE,
    RECT_OBJ,
    IMG_OBJ,
    TEXT_OBJ,
    CIRCLE_OBJ, 
    TRIANGLE_OBJ
}