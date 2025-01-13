import { generateGuid } from "./actions"
import { TextObject } from "./types"

export const getDefaultTextField = (): TextObject => {
    const id = generateGuid()
    return {
        id,
        width: 100, 
        height: 100, 
        color: '#000000',
        text: 'NewText',
        font: 'arial',
        fontsize: 16,
        position: {X: 50, Y: 50}, 
        type: 'text'
    } 
}