type PresNameInputProps = {
    onChange: () => void
}

const PresNameInput = ({onChange}: PresNameInputProps) =>  {
    return(
        <div>
            <input onChange={onChange} value={"Название презентации"}/>
        </div>
    )
}

export {
    PresNameInput
}