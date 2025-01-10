import { useAppSelector } from "./useAppSelector";

const KEY = 'presentation'

export const useSaveStateToLocalStorage = () => {
    const state = useAppSelector((state) => state)

    const saveState = () => {
        const presentation = JSON.stringify(state)
        localStorage.setItem(KEY, presentation)  
    }

    return saveState
}