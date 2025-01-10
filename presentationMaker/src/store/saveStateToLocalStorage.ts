import { useAppSelector } from "../hooks/useAppSelector"


const KEY = 'presentation'

export const saveStateToLocalStorage = () => {
    const stat = useAppSelector(state => state)
    const presentation = JSON.stringify(stat)
    localStorage.setItem(KEY, presentation)  
}