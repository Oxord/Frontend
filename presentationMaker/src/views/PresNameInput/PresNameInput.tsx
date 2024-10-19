type PresNameInputProps = {
    onChange: () => void
}

const PresNameInput = ({onChange}: PresNameInputProps) =>  {
    return(
        <div>
            <input onChange={onChange}>Название презентации</input>
        </div>
    )
}

export {
    PresNameInput
}