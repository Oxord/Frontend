import { generateGuid } from "./actions"
import { ImageObject } from "./types"

export const getDefaultImage = (src: string): ImageObject => {
    const id = generateGuid()
    return {
        id,
        width: 150, 
        height: 150, 
        src: src, 
        position: {X: 50, Y: 50}, 
        type: 'image'
    } 
}