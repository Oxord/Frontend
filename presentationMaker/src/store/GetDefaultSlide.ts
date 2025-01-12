import { generateGuid } from "./actions"
import { SolidBackground } from "./types"

export const getDefaultSlide = () => {
    const slideId = generateGuid()
    const background: SolidBackground = {
        color: '#ffffff',
        type: 'solid'
    }
    return {
        id: slideId, 
        background: background,
        objects: []
    }
}