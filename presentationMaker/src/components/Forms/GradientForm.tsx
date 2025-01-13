import { useState } from 'react'
import style from './Popup.module.css'
import { useAppActions } from '../../hooks/useAppActions'
import { GradientTypeValues } from '../../store/SlidesAction'

export type ColorFormProps = {
    selectedSlideId: string
    onClose: () => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const GradientForm = ({ selectedSlideId, onClose}: ColorFormProps) => {
    const [gradientValue1, setGradientValue1] = useState('#000000')
    const [gradientValue2, setGradientValue2] = useState('#000000')
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, gradientNum: number) => {
        if (gradientNum === 1) {
            setGradientValue1(event.target.value)
        }
        if (gradientNum === 2) {
            setGradientValue2(event.target.value)
        }
    }

    const [gradientType, setGradientType] = useState<GradientTypeValues>('right')
    const onGradientTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGradientType(event.target.value as GradientTypeValues)
    }

    const { changeBackgroundGradient } = useAppActions()
    const onSubmit = () => {
        changeBackgroundGradient(
            selectedSlideId,
            [
                gradientValue1,
                gradientValue2
            ],
            gradientType
        )
    }
    const allValues: GradientTypeValues[] = ['right', 'left', 'top', 'bottom', 'top right', 'top left', 'bottom right', 'bottom left']
    return(
        <div className={style.popup__form + ' ' + 'form'}>
            <div className={style.form__title}>Select the gradient colors:</div>
            <input type='color' className={style.form__input} onChange={(event) => handleInputChange(event, 1)} value={gradientValue1}></input>
            <input type='color' className={style.form__input} onChange={(event) => handleInputChange(event, 2)} value={gradientValue2}></input>
            <div className={style.popup__form}>
                <label htmlFor="gradientTypeList" className={style.form__title}>Choose gradient type:</label>
                <select id="gradientTypeList" value={gradientType} onChange={onGradientTypeChange} className={style.form__input}>
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