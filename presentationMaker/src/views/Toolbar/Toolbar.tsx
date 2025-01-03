import { useRef, useState } from "react"
import { insertFigure } from "../../store/Actions/insertFigure"
import { dispatch } from "../../store/editor"
import { InsertTool } from "../InsertTool/InsertTool"
import style from './ToolBar.module.css'
import { Popup } from "../../components/Popup/Popup"
import { PopupCover } from "../../components/Popup/PopupCover"
import { changeTextFont } from "../../store/Actions/changeTextFont"
import { changeTextSize } from "../../store/Actions/changeTextSize"
import { removeObj } from "../../store/Actions/removeObj"
import { changeBackgroundColor } from "../../store/Actions/changeBackgroundColor"
import { changeBackgroundImage } from "../../store/Actions/changeBackgroundImage"
import { Form } from "../../components/Forms/Form"
import { insertImage } from "../../store/Actions/insertImage"
type toolbarProps = {
    onAddSlide: () => void
    onAddText: () => void
    onExport: () => void
    onRemoveSlide: () => void
    slideId: string
    isRemoveSlideAvailable: boolean
    selectedElems: string[]
    selectedElemType: string
    selectedElemColor:  string | null
}

const Toolbar = ({ onAddSlide, onAddText, selectedElems, onRemoveSlide, slideId, isRemoveSlideAvailable, selectedElemType, selectedElemColor }: toolbarProps) => {

    const onAddFigure = (figureType: string) => {
        dispatch(insertFigure, {slideId, figureType})
    }  

    let removeSlideClassName = style.toolBar__tool
    if (isRemoveSlideAvailable) {
        removeSlideClassName = style.toolBar__tool
    }
    else{
        removeSlideClassName = removeSlideClassName + ' ' + style.toolBar__tool_notAvailable
    }
    
    let removeObjectClassName = style.toolBar__tool
    if (selectedElems.length > 0){
        removeObjectClassName = style.toolBar__tool
    }
    else{
        removeObjectClassName = removeObjectClassName + ' ' + style.toolBar__tool_notAvailable
    }

    const textPropertyClassName = style.toolBar__tool_textProperties

    let elemColorClassName
    if (selectedElemType === 'circle' || selectedElemType === 'rectangle' || selectedElemType === 'triangle' || selectedElemType === 'text') {
        elemColorClassName = style.toolBar__colors 
    }
    else{
        elemColorClassName = elemColorClassName + ' ' + style.toolBar__tool_notAvailable
    }

    const [backgroundOpened, setBackgroundOpened] = useState(false);
    const changeBackgroundOpened = () => {
        setBackgroundOpened(!backgroundOpened)
    }

    const [popupType, setPopupType] = useState('color')
    const changePopupType = (newPopupType: string) => {
        setPopupType(newPopupType)
    }

    const [popupOpened, setPopupOpened] = useState(false)
    const changePopupOpened = () => {
        setPopupOpened(!popupOpened)
    }

    const onClickChangeBackground = (newPopupType: string) => {
        changePopupType(newPopupType)
        changePopupOpened()
    }

    const ref = useRef(null)
    const handleClick = () => {
        ref.current.click()
    }

    const [fontValue, setFontValue] = useState('arial')
    const onChangeFont: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setFontValue(event.target.value)
    }
    const setFontSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          console.log(fontValue);
          const elemId = selectedElems[0]
          dispatch(changeTextFont, {slideId, elemId, newFont: fontValue})  
        }
    }

    const onRemoveObject = () => {
        dispatch(removeObj, {slideId, selectedElems})
    }  

    const [textSize, setTextSize] = useState<number>(16)
    const onChangeTextSize: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setTextSize(Number(event.target.value))
    }
    const setTextSizeSubmit = (event: React.KeyboardEvent<HTMLInputElement> ) => {
        if (event.key === '1') {
          console.log(textSize);
          const elemId = selectedElems[0]
          dispatch(changeTextSize, {slideId, elemId, newFontSize: textSize})  
        }
    }

    const [inputColor, setInputColor] = useState('black')

    const handleInputColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputColor(event.target.value)
    }

    const onChangeBackground = () => {
        const color = inputColor
        dispatch(changeBackgroundColor, {slideId, color})
    }

    const [inputImgValue, setInputImgValue] = useState('')

    const handleInputImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputImgValue(event.target.value)
    }

    const onAddImage = () => {
        const src = inputImgValue
        if (src) {
            dispatch(changeBackgroundImage, {slideId, src})
        }
        else{
            alert('Не удалось добавить файл:(')
        }
    }

    return(
        <div className={style.toolBar}>
            <button onClick={onAddSlide} className={style.toolBar__tool}>+ New Slide</button>
            <button onClick={onRemoveSlide} className={removeSlideClassName}>Remove Slide</button>
            <button onClick={onRemoveObject} className={removeObjectClassName}>Remove Obj</button>
            <InsertTool 
                onAddFigure={onAddFigure}
                onAddText={onAddText}
                insertButtonStyle={style.toolBar__tool}
                slideId={slideId}
            />
            <div>
                <button className={style.toolBar__tool} onClick={changeBackgroundOpened}>Change background
                </button>
                {backgroundOpened 
                    && <div className={style.objectList + ' ' + style.insertSection}>
                            <button onClick={() => {onClickChangeBackground('color')}}>Set color</button>
                            <button onClick={handleClick}>Set local image
                                <input id='image' type='file' style={{display: 'none'}} ref={ref}></input>
                            </button>   
                            <button onClick={() => {onClickChangeBackground('image')}}>Set outher image</button>
                    </div>
                }
            </div>
            {selectedElemType === 'text' && 
                <>
                    <div className={textPropertyClassName}>
                        <input className={style.toolBar__tool_textProperties__font_input} 
                            type="text" 
                            defaultValue={fontValue} 
                            onChange={onChangeFont} 
                            onKeyDown={setFontSubmit}
                        />
                        <input className={style.toolBar__tool_textProperties__font_input + ' ' + style.toolBar__tool_textProperties__textSize} 
                            type="number" 
                            defaultValue={textSize}
                            onChange={onChangeTextSize}
                            onKeyDown={setTextSizeSubmit}
                        />
                        <div className={style.toolBar__colors_textColor}>
                            <div className={style.toolBar__colors__colorBlock}>
                                <div className={style.toolBar__colors__colorBlock__Icon}>
                                    <img src='.\src\assets\textColor.png' alt="textColor" className={style.toolBar__colors__colorBlock__Icon__textColor}/>
                                </div>
                                <div className={style.toolBar__colors__colorBlock__color}></div>
                            </div>
                        </div>
                    </div>
                </>}
            {selectedElemType !== 'text' && 
                <div className={elemColorClassName}>
                    <div className={style.toolBar__colors__colorBlock}>
                        <div className={style.toolBar__colors__colorBlock__Icon}>
                            <img src='.\src\assets\fillColor.png' alt="fillColor" className={style.toolBar__colors__colorBlock__Icon__fillColor}/>
                        </div>
                        <div className={style.toolBar__colors__colorBlock__color} style={{ backgroundColor: selectedElemColor }}></div>
                    </div>
                </div>
            }    
            <PopupCover isVisible={popupOpened}/>
            <Popup isVisible={popupOpened}>
                {popupType === 'image' && <Form
                        title='URL изображения:'
                        inputType='text'
                        handleInputChange={handleInputImgChange}
                        onSubmit={onAddImage}
                        onClose={changePopupOpened}
                    />}
                {popupType === 'color' && <Form
                        title='Выберите цвет'
                        inputType='color'
                        handleInputChange={handleInputColorChange}
                        onSubmit={onChangeBackground}
                        onClose={changePopupOpened}
                    />   }
            </Popup>
        </div>
    )
}

export{
    Toolbar
}

