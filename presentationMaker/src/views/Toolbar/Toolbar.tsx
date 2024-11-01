import { InsertTool } from "../InsertTool/InsertTool"
import style from './ToolBar.module.css'
type toolbarProps = {
    onAddSlide: () => void
    onRemove: () => void
    onAddFigure: () => void
    onAddImage: () => void
    onAddText: () => void
    onClickInsert: () => void
    onExport: () => void
}

const Toolbar = ({ onAddSlide, onRemove, onAddFigure, onAddImage, onAddText, onClickInsert }: toolbarProps) => {
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
    return(
        <div className={style.toolBar}>
            <button onClick={onAddSlide} className={style.toolBar__tool}>+ New Slide</button>
            <button onClick={onRemove} className={removeToolClassName}>Remove</button>
            <InsertTool 
                onAddFigure={onAddFigure}
                onAddImage={onAddImage}
                onAddText={onAddText}
                onClickInsert={onClickInsert}
                insertButtonStyle={style.toolBar__tool}
            />
            <button className={style.toolBar__tool}>Change background</button>
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
                        <img src='.\src\assets\fillColor.png' alt="textColor" className={style.toolBar__colors__colorBlock_fillColorIcon}/>
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

