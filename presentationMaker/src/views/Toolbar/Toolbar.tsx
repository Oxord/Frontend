// import { ReactNode } from "react"

import { FigureType } from "../../store/types"

type toolbarProps = {
    onAddFigure: (figureType: FigureType) => void,
    onAddSlide: () => void,
}

export const Toolbar = () => {
    return(
        <div className="">
            <div className="">
                <button></button>
            </div>
        </div>
    )
}