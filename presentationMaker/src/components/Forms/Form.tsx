import style from './Popup.module.css'

export type ColorFormProps = {
    title: string
    inputType: 'color' | 'text'
    onSubmit: () => void
    onClose: () => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Form = ({ title, inputType, onSubmit, onClose, handleInputChange }: ColorFormProps) => {
    return(
        <div className={style.popup__form + ' ' + 'form'}>
            <div className={style.form__title}>{title}</div>
            <input type={inputType} className={style.form__input} onChange={handleInputChange}></input>
            <div className={style.form__buttons}>
                <button
                    onClick={onClose}>
                    Close
                </button>
                <button   
                    onClick={() => {onSubmit(); onClose()}}>
                    Insert
                </button>
            </div>
        </div>
    )
}

export {
    Form
}