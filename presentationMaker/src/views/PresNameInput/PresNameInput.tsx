import style from './PresNameInput.module.css'

type PresNameInputProps = {
    onChange: () => void
}

const PresNameInput = ({onChange}: PresNameInputProps) =>  {
    return(
        <div className={style.inputForm}>
            <input onChange={onChange} value={"Название презентации"} className={style.input}/>
        </div>
    )
}

export {
    PresNameInput
}