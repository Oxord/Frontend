import { ReactNode } from "react"
import style from './Popup.module.css'

type PopupProps = {
  children: ReactNode
  isVisible: boolean
}

export const Popup = ({ children, isVisible }: PopupProps) => {
  let classPopupModificator = ''
  if (isVisible) {
    classPopupModificator = style.popup
  } else {
    classPopupModificator = classPopupModificator + style.popup_hidden
  }
  return (
      <div className={classPopupModificator}>
        <div className={style.popup__form}>{children}</div>
      </div>
  );
};