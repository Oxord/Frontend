import { EditorType } from "./EditorType";
import { SlideType } from "../types";

function changeSlidePosition(editor: EditorType, newOrder: string[]): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newOrder.reduce((slideList: SlideType[], id: string) => {
                const slide = editor.presentation.slides.find(slide => slide.id === id)
                if (slide) {
                    slideList.push(slide)
                }
                return slideList;
            }, [])

        }
    }

}

export {
    changeSlidePosition
}