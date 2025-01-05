import { bindActionCreators } from "redux"
import ActionCreators from "../store/Actions-Creators/ActionCreators"
import { useDispatch } from "react-redux"

export const useAppActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(ActionCreators, dispatch)
}