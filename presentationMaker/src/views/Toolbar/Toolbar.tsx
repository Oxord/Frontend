import { insertFigure } from "../../store/Actions/insertFigure"
import { insertTextField } from "../../store/Actions/insertTextField"
import { dispatch } from "../../store/editor"
import { InsertTool } from "../InsertTool/InsertTool"
import style from './ToolBar.module.css'
type toolbarProps = {
    onAddSlide: () => void
    onRemove: () => void
    onClickInsert: () => void
    onExport: () => void
    onRemoveSlide: () => void
    onChangeBackground: () => void
    slideId: string
    isRemoveSlideAvailable: boolean
}

const Toolbar = ({ onAddSlide, onRemove, onRemoveSlide, slideId, isRemoveSlideAvailable, onChangeBackground }: toolbarProps) => {
    console.log(isRemoveSlideAvailable)
    let removeSlideStyle = style.toolBar__tool
    if (isRemoveSlideAvailable) {
        removeSlideStyle = style.toolBar__tool
    }
    else{
        removeSlideStyle = removeSlideStyle + ' ' + style.toolBar__tool_notAvailable
    }
    const isRemoveAvailable = false
    let removeToolClassName = style.toolBar__tool
    if (!isRemoveAvailable){
        removeToolClassName = removeToolClassName + ' ' + style.toolBar__tool_notAvailable
    }
    else{
        removeToolClassName = style.toolBar__tool
    }
    const isTextPropertiesAvailable = false
    let textPropertyClassName = style.toolBar__tool_textProperties
    if (!isTextPropertiesAvailable){
        textPropertyClassName = textPropertyClassName + ' ' + style.toolBar__tool_textProperties_notAvailable
    }
    else{
        textPropertyClassName = style.toolBar__tool_textProperties
    }
    const onAddText: React.ChangeEventHandler = () => {
        dispatch(insertTextField, {slideId})
    }

    const onAddFigure = (figureType: string) => {
        dispatch(insertFigure, {slideId, figureType})
    }

    return(
        <div className={style.toolBar}>
            <button onClick={onAddSlide} className={style.toolBar__tool}>+ New Slide</button>
            <button onClick={onRemoveSlide} className={removeSlideStyle}>Remove Slide</button>
            <button onClick={onRemove} className={removeToolClassName}>Remove Obj</button>
            <InsertTool 
                onAddFigure={onAddFigure}
                onAddText={onAddText}
                insertButtonStyle={style.toolBar__tool}
                slideId={slideId}
            />
            <button className={style.toolBar__tool} onClick={onChangeBackground}>Change background</button>
            <div className={textPropertyClassName}>
                <button className={style.toolBar__tool_textProperties__property}>Arial</button>
                <button className={style.toolBar__tool_textProperties__property + ' ' + style.toolBar__tool_textProperties__property_textSize}>16</button>
            </div>
            <div className={style.toolBar__colors}>
                <div className={style.toolBar__colors__colorBlock}>
                    <div className={style.toolBar__colors__colorBlock__Icon}>
                        <img src='.\src\assets\textColor.png' alt="textColor" className={style.toolBar__colors__colorBlock__Icon__textColor}/>
                    </div>
                    <div className={style.toolBar__colors__colorBlock__color}></div>
                </div>
                <div className={style.toolBar__colors__colorBlock}>
                    <div className={style.toolBar__colors__colorBlock__Icon}>
                        <img src='.\src\assets\fillColor.png' alt="textColor"/>
                    </div>
                    <div className={style.toolBar__colors__colorBlock__color}></div>
                </div>
            </div>
        </div>
    )
}

export{
    Toolbar
}

