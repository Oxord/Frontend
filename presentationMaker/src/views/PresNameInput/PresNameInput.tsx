import { useAppActions } from '../../hooks/useAppActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import style from './PresNameInput.module.css'

const PresNameInput = () =>  {
    const { changePresentationTitle } = useAppActions()
    const onChangePresTitle: React.ChangeEventHandler = (event) => {
        const newName = (event.target as HTMLInputElement).value
        changePresentationTitle(newName)        
    }
    const title = useAppSelector(state => state.title)
    return(
        <div className={style.inputForm}>
            <input onChange={onChangePresTitle} value={title} className={style.input}/>
        </div>
    )
}

export {
    PresNameInput
}