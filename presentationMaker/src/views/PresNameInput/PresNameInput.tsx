import style from './PresNameInput.module.css'

type PresNameInputProps = {
    presentationName: string
    onChange: () => void
}

const PresNameInput = ({onChange, presentationName}: PresNameInputProps) =>  {
    return(
        <div className={style.inputForm}>
            <input onChange={onChange} value={presentationName} className={style.input}/>
        </div>
    )
}

export {
    PresNameInput
}