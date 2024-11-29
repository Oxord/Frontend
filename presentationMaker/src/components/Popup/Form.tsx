import { useState } from 'react'
import style from './Popup.module.css'
import { dispatch } from '../../store/editor'
import { insertImage } from '../../store/Actions/insertImage'


type FormProps = {
    onClose: () => void
    slideId: string
}

const Form = ({slideId, onClose}: FormProps): JSX.Element => {

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        console.log(inputValue)
    }

    const onAddImage = () => {
        const src = inputValue
        if (src) {
            dispatch(insertImage, {slideId, src})
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
    Form
}
