import { useState } from 'react'
import { dispatch } from '../../../store/editor'
import { insertImage } from '../../../store/Actions/insertImage'
import style from '../Popup.module.css'
import { changeBackgroundImage } from '../../../store/Actions/changeBackgroundImage'


type ImageFormProps = {
    onClose: () => void
    slideId: string
    isInsert: boolean
}

const ImageForm = ({slideId, onClose, isInsert}: ImageFormProps): JSX.Element => {

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        console.log(inputValue)
    }

    const onAddImage = () => {
        const src = inputValue
        if (src) {
            if (isInsert) {
                dispatch(insertImage, {slideId, src})
            }
            else{
                dispatch(changeBackgroundImage, {slideId, src})
            }
        }
        else{
            alert('Не удалось добавить файл:(')
        }
    }

    return (
        <div className={style.popup__form + ' ' + 'form'}>
            <div className={style.form__title}>Укажите ссылку на источник:</div>
            <input className={style.form__input} onChange={handleInputChange}></input>
            <div className={style.form__buttons}>
                <button
                    onClick={onClose}>
                    Close
                </button>
                <button   
                    onClick={() => {onAddImage(); onClose()}}>
                    Insert
                </button>
            </div>
        </div>
    )
}

export{
    ImageForm
}
