import { useAppActions } from '../../hooks/useAppActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import style from './PresNameInput.module.css'

const PresNameInput = () =>  {
    const { changePresentationTitle } = useAppActions()
    const onChangePresName: React.ChangeEventHandler = (event) => {
        const newName = (event.target as HTMLInputElement).value
        changePresentationTitle(newName)        
    }
    const value = useAppSelector(state => state.title)
    return(
        <div className={style.inputForm}>
            <input onChange={onChangePresName} value={value} className={style.input}/>
        </div>
    )
}

export {
    PresNameInput
}