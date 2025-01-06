import { generateGuid } from "./actions"
import { SolidBackground } from "./types"

export const getDefaultSlide = () => {
    const slideId = generateGuid()
    const background: SolidBackground = {
        color: 'white',
        type: 'solid'
    }
    return {
        id: slideId, 
        background: background,
        objects: []
    }
}