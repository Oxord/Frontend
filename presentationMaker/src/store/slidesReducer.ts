import { getDefaultImage } from "./GetDefaultImage"
import { getDefaultFigure } from "./GetDefaultFigure"
import { SlideActionTypes } from "./SlideActionTypes"
import { ChangeBackgroundPayload, ChangeElemColorPayload, ChangeElemPositionPayload, ChangeElemSizePayload, ChangeSlidePositionPayload, ChangeTextFontPayload, ChangeTextPayload, ChangeTextSizePayload, ImportImagePayload, InsertFigurePayload, InsertImagePayload, InsertTextFieldPayload, RemoveElemPayload, RemoveSlidePayload, SlidesAction, UpdateSlidesPayload } from "./SlidesAction"
import { SlidesState } from "./SlidesState"
import { Background, SlideObject, SlideType, TextObject } from "./types"
import { getDefaultTextField } from "./GetDefaultTextField"
import { getDefaultSlide } from "./GetDefaultSlide"
import { initialData } from "./initialData"
import { getStateFromLocalStorage } from "./getStateFromLocalStorage"

const getInitialState = () => {
    const _state = getStateFromLocalStorage()
    if (_state) {
        return _state.slides
    }
    else {
        return initialData.slides
    }
}

const slidesReducer = (state = getInitialState(), action: SlidesAction): SlidesState => { 
    switch (action.type) { 
        case SlideActionTypes.ADD_SLIDE: {
            const newSlide = getDefaultSlide()
            return [...state, newSlide]
        }
        case SlideActionTypes.REMOVE_SLIDE: {
            const slideId = (action.payload as RemoveSlidePayload).selectedSlideId
            return state.filter(item => item.id !== slideId)
        }
        case SlideActionTypes.CHANGE_SLIDE_BACKGROUND: {
            const slideId = (action.payload as ChangeBackgroundPayload).selectedSlideId
            const value = (action.payload as ChangeBackgroundPayload).value
            const type = (action.payload as ChangeBackgroundPayload).type
            const slide = state.find(s => s.id === slideId)
            if (slide) {
                let newBackground : Background 
                if (type === 'solid'){
                    newBackground = {
                        color: value,
                        type: 'solid'
                    }
                }
                else{
                    newBackground = {
                        src: value,
                        type: 'image'
                    }
                }    
                const editedSlide: SlideType = { ...slide, background: newBackground }
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
        case SlideActionTypes.CHANGE_SLIDE_POSITION: {
            const newOrder = (action.payload as ChangeSlidePositionPayload).newOrder
            return newOrder.reduce((slideList: SlideType[], id: string) => {
                    const slide = state.find(slide => slide.id === id)
                    if (slide) {
                        slideList.push(slide)
                    }
                    return slideList;
                }, [])
        }
        //insert elements
        case SlideActionTypes.INSERT_FIGURE: {
            const slideId = (action.payload as InsertFigurePayload).selectedSlideId
            const figureType = (action.payload as InsertFigurePayload).figureType 
            const slide = state.find(s => s.id === slideId)
            const figure = getDefaultFigure(figureType)
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
            const slideId = (action.payload as InsertImagePayload).selectedSlideId
            const src = (action.payload as InsertImagePayload).src 
            const slide = state.find(s => s.id === slideId)
            if (slide && action.payload) {
                const image = getDefaultImage(src)
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
        case SlideActionTypes.IMPORT_IMAGE: {
            return state
        }
        case SlideActionTypes.IMPORT_IMAGE_SUCCESS: {
            const slideId = (action.payload as ImportImagePayload).selectedSlideId
            const slide = state.find(s => s.id === slideId)
            if (slide) {
                const img = (action.payload as ImportImagePayload).image
                const image = getDefaultImage(img)
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
        case SlideActionTypes.IMPORT_IMAGE_FAILURE: {
            return state
        }
        case SlideActionTypes.INSERT_TEXT_FIELD: {
            const slideId = (action.payload as InsertTextFieldPayload).selectedSlideId
            const slide = state.find(s => s.id === slideId)
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
            const slideId = (action.payload as ChangeTextFontPayload).selectedSlideId
            const slide = state.find(s => s.id === slideId)
            if (slide) {
                const elemId = (action.payload as ChangeTextFontPayload).selectedElemId
                const searchedObj = slide.objects.find(o => o.id === elemId) 
                if (searchedObj && searchedObj.type === 'text') {
                    const font = (action.payload as ChangeTextFontPayload).newFont
                    const editedObj: TextObject = {...searchedObj, font}
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
            const slideId = (action.payload as RemoveElemPayload).selectedSlideId
            const slide: SlideType | undefined = state.find(s => s.id === slideId)
            if (slide) {
                const elemId = (action.payload as RemoveElemPayload).selectedElemId 
                const editedSlide: SlideType = { ...slide, objects: slide.objects.filter(s => s.id !== elemId) }
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
            const slideId = (action.payload as ChangeElemColorPayload).selectedSlideId
            const slide = state.find(s => s.id === slideId)
            if (slide) {
                const elemId = (action.payload as ChangeElemColorPayload).selectedElemId
                const searchedObj = slide.objects.find(o => o.id === elemId)
                if (searchedObj && searchedObj.type !== 'image') {
                    const color = (action.payload as ChangeElemColorPayload).newColor
                    const editedObj: SlideObject = {...searchedObj, color}
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
            const slideId = (action.payload as ChangeTextPayload).selectedSlideId
            const slide = state.find(s => s.id === slideId)
            if (slide) {
                const elemId = (action.payload as ChangeTextPayload).selectedElemId
                const searchedObj = slide.objects.find(o => o.id === elemId)
                if (searchedObj && searchedObj.type === 'text') {
                    const text = (action.payload as ChangeTextPayload).newText
                    const editedObj: SlideObject = {...searchedObj, text}
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
            const slideId = (action.payload as ChangeTextSizePayload).selectedSlideId
            const slide = state.find(s => s.id === slideId)
            if (slide) {
                const elemId = (action.payload as ChangeTextSizePayload).selectedElemId
                const searchedObj = slide.objects.find(o => o.id === elemId)
                if (searchedObj && searchedObj.type === 'text') {
                    const fontsize = (action.payload as ChangeTextSizePayload).newFontsize
                    const editedObj: SlideObject = {...searchedObj, fontsize}
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
        case SlideActionTypes.CHANGE_ELEM_SIZE: {
            const slideId = (action.payload as ChangeElemSizePayload).selectedSlideId
            const elemId = (action.payload as ChangeElemSizePayload).selectedElemId
            const newSize = (action.payload as ChangeElemSizePayload).newSize
            return state.map(slide => {
                    if (slide.id === slideId) {
                        return {
                            ...slide,
                            objects: slide.objects.map(object => {
                                if (object.id === elemId) {
                                    return {
                                        ...object,
                                        width: newSize.width, 
                                        height: newSize.height
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
            const slideId = (action.payload as ChangeElemPositionPayload).selectedSlideId
            const elemId = (action.payload as ChangeElemPositionPayload).selectedElemId
            const newPos = (action.payload as ChangeElemPositionPayload).newPos
            return state.map(slide => {
                if (slide.id === slideId) {
                    return {
                        ...slide,
                        objects: slide.objects.map(object => {
                            if (object.id === elemId) {
                                    return {
                                        ...object,
                                        position: newPos
                                    }
                                }
                                return object
                            })
                        }
                    }
                    return slide
                })    
        }
        case SlideActionTypes.UPDATE_SLIDES: {
            const slides = (action.payload as UpdateSlidesPayload).slides
            return slides
        }
        default: 
            return state   
    }
}

export { 
    slidesReducer
}