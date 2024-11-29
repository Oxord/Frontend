import style from './Popup.module.css'

type PopupCoverProps = {
    isVisible: boolean;
}

export const PopupCover = ({ isVisible }: PopupCoverProps) => {
    let classCoverModificator = style.cover__popup
    if (isVisible) {
        classCoverModificator = style.cover__popup 
    } else {
        classCoverModificator = style.cover__popup + ' ' + style.cover__popup_hidden
    }
    return (
        <div className={classCoverModificator}></div>
    )
}