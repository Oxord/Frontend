import { generateGuid } from "../actions"
import { EditorType } from "./EditorType"
import { FigureObject, FigureType, SlideType } from "../types"

function insertFigure(editor: EditorType, {slideId, figureType}: {slideId: string, figureType: FigureType}): EditorType {
    const searchedSlide: SlideType | undefined = editor.presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const figureId = generateGuid()
        let figure: FigureObject | null = null
        switch (figureType){
            case 'circle': 
                figure = { 
                    id: figureId,  
                    type: 'circle',  
                    color: 'red', 
                    radius: 30, 
                    position: {X: 150, Y: 150}, 
                    width: 50,
                    height: 50
                }
                break
            case 'rectangle': 
                figure = { 
                    id: figureId,  
                    type: 'rectangle', 
                    color: 'red', 
                    width: 200, 
                    height: 200, 
                    position: {X: 150, Y: 150} 
                }
                break
            case 'triangle':
                figure =  {
                    id: figureId,
                    type: 'triangle',
                    color: 'red',
                    pointOne: {X: 0, Y: 44},
                    pointTwo: {X: 22, Y: 4},
                    pointThree: {X: 44, Y: 44},
                    width: 45,
                    height: 45,
                    position: {X: 50, Y: 50},
                }    
        }
        if (figure) {
            const editedSlide: SlideType = {...searchedSlide, objects: [...searchedSlide.objects, figure]}
            return {
                ...editor,
                presentation: {
                    ...editor.presentation,
                    slides: editor.presentation.slides.map(x => {
                        if (x.id === editedSlide.id){
                            return editedSlide
                        }
                        else{
                            return x
                        }
                    }),
                },
            }
        }
        else{
            return editor
        }
    }
    else{
        return editor
    }
}

export {
    insertFigure,
}