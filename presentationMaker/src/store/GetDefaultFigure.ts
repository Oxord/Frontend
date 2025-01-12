import { generateGuid } from "./actions"
import { FigureObject } from "./types"

export const getDefaultFigure = (figureType: string): FigureObject | null => {
    const id = generateGuid()
    let figure: FigureObject | null = null
    switch (figureType) {
        case 'circle': 
            figure = { 
                id: id,  
                type: 'circle',  
                color: '#000000', 
                radius: 30, 
                position: {X: 50, Y: 50}, 
                width: 30,
                height: 30
            }
            break
        case 'rectangle': 
            figure = { 
                id: id,  
                type: 'rectangle', 
                color: '#000000', 
                width: 50, 
                height: 50, 
                position: {X: 50, Y: 50} 
            }
            break
        case 'triangle':
            figure = {
                id: id,
                type: 'triangle',
                color: '#000000',
                pointOne: {X: 0, Y: 44},
                pointTwo: {X: 22, Y: 4},
                pointThree: {X: 44, Y: 44},
                width: 45,
                height: 45,
                position: {X: 50, Y: 50},
            }          
    } 
    return figure
}