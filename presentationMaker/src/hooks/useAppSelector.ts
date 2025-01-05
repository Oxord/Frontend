import { TypedUseSelectorHook, useSelector } from "react-redux"
import rootReducer from "../store/rootReducer"

type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector