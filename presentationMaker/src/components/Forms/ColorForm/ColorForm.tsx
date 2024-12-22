import { useState } from 'react'
import style from '../Popup.module.css'
import { dispatch } from '../../../store/editor'
import { changeBackgroundColor } from '../../../store/Actions/changeBackgroundColor'

export type ColorFormProps = {
    slideId: string,
    onClose: () => void
}

const ColorForm = ({ slideId, onClose }: ColorFormProps) => {
    
    const [inputValue, setInputValue] = useState('black')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        console.log(inputValue)
    }

    const onChangeBackground = () => {
        const color = inputValue
        dispatch(changeBackgroundColor, {slideId, color})
    }

    return(
        <div className={style.popup__form + ' ' + 'form'}>
            <div className={style.form__title}>Выберите цвет</div>
            <input type='color' className={style.form__input} onChange={handleInputChange}></input>
            <div className={style.form__buttons}>
                <button
                    onClick={onClose}>
                    Close
                </button>
                <button   
                    onClick={() => {onChangeBackground(); onClose()}}>
                    Insert
                </button>
            </div>
        </div>
    )
}

export {
    ColorForm
}