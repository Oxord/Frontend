import { TitleAction } from "../TitleAction"
import { TitleActionType } from "../TitleActionType"

export const changePresentationTitle = (title: string): TitleAction => {
    return {
        type: TitleActionType.CHANGE_PRESENTATION_TITLE,
        payload: title
    }
}