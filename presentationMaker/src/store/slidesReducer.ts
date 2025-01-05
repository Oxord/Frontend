import { getDefaultImage } from "./GetDefaultImage"
import { getDefaultFigure } from "./GetDefaultFigure"
import { SlideActionTypes } from "./SlideActionTypes"
import { SlidesAction } from "./SlidesAction"
import { SlidesState } from "./SlidesState"
import { SlideObject, SlideType, SolidBackground, TextObject } from "./types"
import { getDefaultTextField } from "./GetDefaultTextField"

const slidesReducer = (state = [] as SlideType[], action: SlidesAction): SlidesState => { 
    switch (action.type) { 
        case SlideActionTypes.ADD_SLIDE: {
            const background: SolidBackground = {
                color: 'white',
                type: 'solid'
            }
            const newSlide: SlideType = {
                id: action.payload,
                background: background,
                objects: []
            } 
            return [ ...state, newSlide ] 
        }
        case SlideActionTypes.REMOVE_SLIDE: 
            return state.filter(item => item.id !== action.payload)
        case SlideActionTypes.CHANGE_SLIDE_BACKGROUND: {
            const slide = state.find(s => s.id === SELECTED_SLIDE_ID) //тут как будто должен быть selectedSlideId
            if (slide) {
                //тут вопрос с тем, что нам делать с картинкой / цветом. типы бэкграундов разные.
                const editedSlide: SlideType = { ...slide, background:  }
                return state.map(x => {
                    if (x.id === slide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }
                })
            }
            return state
        }
        case SlideActionTypes.INSERT_FIGURE: {
            const slide = state.find(s => s.id === SELECTED_SLIDE_ID) //тут как будто должен быть selectedSlideId
            const figure = getDefaultFigure(action.payload)
            if (figure && slide){
                const editedSlide: SlideType = { ...slide, objects: [...slide.objects, figure] }
                return state.map(x => {
                    if (x.id === slide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }
                })
            }
            return state
        }
        case SlideActionTypes.INSERT_IMAGE: {
            const slide = state.find(s => s.id === SELECTED_SLIDE_ID) //тут как будто должен быть selectedSlideId
            if (slide && action.payload) {
                const image = getDefaultImage(action.payload)
                const editedSlide: SlideType = { ...slide, objects: [...slide.objects, image] }
                return state.map(x => {
                    if (x.id === slide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }
                })
            }
            return state
        }
        case SlideActionTypes.INSERT_TEXT_FIELD: {
            const slide = state.find(s => s.id === SELECTED_SLIDE_ID) //тут как будто должен быть selectedSlideId
            if (slide) {
                const textField = getDefaultTextField()
                const editedSlide: SlideType = { ...slide, objects: [...slide.objects, textField] }
                return state.map(x => {
                    if (x.id === slide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }
                })
            }
            return state
        }
        //change elements
        case SlideActionTypes.CHANGE_TEXT_FONT: {
            const slide = state.find(s => s.id === SELECTED_SLIDE_ID) //тут как будто должен быть selectedSlideId
            if (slide) {
                const searchedObj = slide.objects.find(o => o.id === SELECTED_ELEM_ID) //тут как будто должен быть selectedElemId
                if (searchedObj && searchedObj.type === 'text') {
                    const editedObj: TextObject = {...searchedObj, font: action.payload}
                    const editedSlide: SlideType = {...slide, objects: slide.objects.map(x => {
                        if (x.id === editedObj.id){
                            return editedObj
                        }
                        else{   
                            return x
                        }
                    })} 
                    return state.map(x => {
                        if (x.id === slide.id) {
                            return editedSlide
                        }
                        else{
                            return x
                        }
                    })
                }
            }
            return state
        }
        case SlideActionTypes.REMOVE_ELEM: {
            const slide: SlideType | undefined = state.find(s => s.id === SELECTED_ELEM_ID) //тут как будто должен быть selectedElemId
            if (slide) {
                const editedSlide: SlideType = { ...slide, objects: slide.objects.filter(s => s.id !== action.payload) }
                return state.map(x => {
                    if (x.id === slide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }
                })
            }
            return state
        }
        case SlideActionTypes.CHANGE_ELEM_COLOR: {
            const slide = state.find(s => s.id === SELECTED_SLIDE_ID) //тут как будто должен быть selectedSlideId
            if (slide) {
                const searchedObj = slide.objects.find(o => o.id === SELECTED_ELEM_ID) //тут как будто должен быть selectedElemId
                if (searchedObj && searchedObj.type !== 'image') {
                    const editedObj: SlideObject = {...searchedObj, color: action.payload}
                    const editedSlide: SlideType = {...slide, objects: slide.objects.map(x => {
                        if (x.id === editedObj.id){
                            return editedObj
                        }
                        else{   
                            return x
                        }
                    })} 
                    return state.map(x => {
                        if (x.id === slide.id) {
                            return editedSlide
                        }
                        else{
                            return x
                        }
                    })
                }
            }
            return state
        }
        case SlideActionTypes.CHANGE_TEXT: {
            const slide = state.find(s => s.id === SELECTED_SLIDE_ID) //тут как будто должен быть selectedSlideId
            if (slide) {
                const searchedObj = slide.objects.find(o => o.id === SELECTED_ELEM_ID) //тут как будто должен быть selectedElemId
                if (searchedObj && searchedObj.type === 'text') {
                    const editedObj: SlideObject = {...searchedObj, text: action.payload}
                    const editedSlide: SlideType = {...slide, objects: slide.objects.map(x => {
                        if (x.id === editedObj.id){
                            return editedObj
                        }
                        else{   
                            return x
                        }
                    })} 
                    return state.map(x => {
                        if (x.id === slide.id) {
                            return editedSlide
                        }
                        else{
                            return x
                        }
                    })
                }
            }
            return state
        }
        case SlideActionTypes.CHANGE_TEXT_SIZE: {
            const slide = state.find(s => s.id === SELECTED_SLIDE_ID) //тут как будто должен быть selectedSlideId
            if (slide) {
                const searchedObj = slide.objects.find(o => o.id === SELECTED_ELEM_ID) //тут как будто должен быть selectedElemId
                if (searchedObj && searchedObj.type === 'text') {
                    const editedObj: SlideObject = {...searchedObj, fontsize: action.payload} //тут есть проблема)))
                    const editedSlide: SlideType = {...slide, objects: slide.objects.map(x => {
                        if (x.id === editedObj.id){
                            return editedObj
                        }
                        else{   
                            return x
                        }
                    })} 
                    return state.map(x => {
                        if (x.id === slide.id) {
                            return editedSlide
                        }
                        else{
                            return x
                        }
                    })
                }
            }
            return state
        }
        case SlideActionTypes.CHANGE_SLIDE_POSITION: {
            //тут ошибка, и всё из-за payload...
            return [
                action.payload.reduce((slideList: SlideType[], id: string) => {
                    const slide = state.find(slide => slide.id === id)
                    if (slide) {
                        slideList.push(slide)
                    }
                    return slideList;
                }, [])
            ]
        }
        case SlideActionTypes.CHANGE_ELEM_SIZE: {
            return state.map(slide => {
                    if (slide.id === SELECTED_SLIDE_ID) { //тут как будто должен быть selectedSlideId
                        return {
                            ...slide,
                            objects: slide.objects.map(object => {
                                if (object.id === SELECTED_ELEM_ID) { //тут как будто должен быть selectedElemId
                                    return {
                                        ...object,
                                        width: action.payload.width, //unluck, but it is frontend, the reason of this error is PAYLOAD: string
                                        height: action.payload.height
                                    }
                                }
                                return object
                            })
                        }
                    }
                    return slide
                })
        }
        case SlideActionTypes.CHANGE_ELEM_POSITION: {
            return state.map(slide => {
                    if (slide.id === SELECTED_SLIDE_ID) { //тут как будто должен быть selectedSlideId
                        return {
                            ...slide,
                            objects: slide.objects.map(object => {
                                if (object.id === SELECTED_ELEM_ID) { //тут как будто должен быть selectedElemId
                                    return {
                                        ...object,
                                        position: action.payload, //unluck, but it is frontend, the reason of this error is PAYLOAD: string
                                        //so 'return' is underlined...
                                    }
                                }
                                return object
                            })
                        }
                    }
                    return slide
                })
        }
        default: 
            return state 
    } 
}

export{ 
    slidesReducer
}