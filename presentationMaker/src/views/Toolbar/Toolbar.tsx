import { InsertTool } from "../InsertTool/InsertTool"

type toolbarProps = {
    onAddSlide: () => void
    onRemove: () => void
    onAddFigure: () => void
    onAddImage: () => void
    onAddText: () => void
    onClickInsert: () => void
    onExport: () => void
}

const Toolbar = ({ onAddSlide, onRemove, onAddFigure, onAddImage, onAddText, onClickInsert, onExport }: toolbarProps) => {
    return(
        <div className="">
            <div className="">
                <button onClick={onAddSlide}>Add slide</button>
                <button onClick={onRemove}>Remove</button>
                <InsertTool 
                    onAddFigure={onAddFigure}
                    onAddImage={onAddImage}
                    onAddText={onAddText}
                    onClickInsert={onClickInsert}
                />
                <button onClick={onExport}>Export</button>
            </div>
        </div>
    )
}

export{
    Toolbar
}

