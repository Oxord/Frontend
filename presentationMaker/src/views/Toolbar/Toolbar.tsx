import { InsertTool } from "../InsertTool/InsertTool"

type toolbarProps = {
    onAddSlide: () => void,
    onRemove: () => void
}
const id = 'hello'

const print = () => {
    action(presentation)
}
export const Toolbar = ({ onAddSlide, onRemove }: toolbarProps) => {
    return(
        <div className="">
            <div className="">
                <button onClick={onAddSlide}>Add slide</button>
                <button onClick={onRemove}>Remove</button>
                <InsertTool 
                    onAddFigure={() => {}}
                    onAddImage={() => {}}
                    onAddText={() => {}}
                    onClickInsert={() => {}}
                />
            </div>
        </div>
    )
}

