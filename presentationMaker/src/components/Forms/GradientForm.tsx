import style from './Popup.module.css'
import { GradientTypeValues } from '../../store/SlidesAction'

export type ColorFormProps = {
    color1: string
    color2: string
    gradientType: string
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, gradientNum: number) => void
    handleInputTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    onSubmit: () => void
    onClose: () => void
}

const GradientForm = ({ color1, color2, gradientType, handleInputChange, handleInputTypeChange, onSubmit, onClose }: ColorFormProps) => {
    const allValues: GradientTypeValues[] = ['right', 'left', 'top', 'bottom', 'top right', 'top left', 'bottom right', 'bottom left']
    return(
        <div className={style.popup__form + ' ' + 'form'}>
            <div className={style.form__title}>Select the gradient colors:</div>
            <input type='color' className={style.form__input} onChange={(event) => handleInputChange(event, 1)} value={color1}></input>
            <input type='color' className={style.form__input} onChange={(event) => handleInputChange(event, 2)} value={color2}></input>
            <div className={style.popup__form}>
                <label htmlFor="gradientTypeList" className={style.form__title}>Choose gradient type:</label>
                <select id="gradientTypeList" value={gradientType} onChange={handleInputTypeChange} className={style.form__input}>
                    {allValues.map((value, key) => {
                        return (
                            <option key={key}>{value}</option>
                        )
                    })}
                </select>
            </div>
            <div className={style.form__buttons}>
                <button
                    onClick={onClose}>
                    Close
                </button>
                <button   
                    onClick={() => {onSubmit(); onClose()}}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export {
    GradientForm
}