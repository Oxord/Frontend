import { SlideActionTypes } from "./SlideActionTypes"
import { SlidesAction } from "./SlidesAction"
import { SlidesState } from "./SlidesState"

const slidesReducer = (state = [], action: SlidesAction): SlidesState => { 
    switch (action.type) { 
        case SlideActionTypes.ADD_SLIDE:
            console.log('123')
            return state
        //     // return state.concat([{ id: generateId(), title: action.payload }]) 
        // case SlidesActionType.REMOVE_SLIDE: 
        //     return state.filter(item => item.slideId !== action.payload)
        default: 
            return state 
    } 
}

export{ 
    slidesReducer
}