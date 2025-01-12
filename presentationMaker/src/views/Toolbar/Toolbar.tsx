import { useRef, useState } from "react"
import { InsertTool } from "../InsertTool/InsertTool"
import style from './ToolBar.module.css'
import { Popup } from "../../components/Popup/Popup"
import { PopupCover } from "../../components/Popup/PopupCover"
import { Form } from "../../components/Forms/Form"
import { useAppActions } from "../../hooks/useAppActions"

type toolbarProps = {
    selectedSlideId: string
    isRemoveSlideAvailable: boolean
    selectedElemId: string
    selectedElemType: string
    selectedElemColor:  string
}

const Toolbar = ({ selectedElemId, selectedSlideId, isRemoveSlideAvailable, selectedElemType, selectedElemColor }: toolbarProps) => {

    

    let removeSlideClassName = style.toolBar__tool
    if (isRemoveSlideAvailable) {
        removeSlideClassName = style.toolBar__tool
    }
    else{
        removeSlideClassName = removeSlideClassName + ' ' + style.toolBar__tool_notAvailable
    }
    
    let removeObjectClassName = style.toolBar__tool
    if (selectedElemId){
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
        setBackgroundOpened(false)
    }
    const onClickChangePopupVisible = (newPopupType: string) => {
        changePopupType(newPopupType)
        changePopupOpened()
    }

    const ref = useRef(null)
    const handleClick = () => {
        ref.current.click()
    }

    const { changeTextFont } = useAppActions()
    const [newFont, setNewFont] = useState('arial')
    const onChangeFont: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewFont(event.target.value)
    }
    const setFontSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') 
          changeTextFont(selectedSlideId, selectedElemId, newFont)          
    }

    
    const { changeTextSize } = useAppActions()
    const [newFontsize, setNewFontsize] = useState<number>(16)
    const onChangeTextSize: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewFontsize(Number(event.target.value))
    }
    const setTextSizeSubmit = (event: React.KeyboardEvent<HTMLInputElement> ) => {
        if (event.key === 'Enter') 
          changeTextSize(selectedSlideId, selectedElemId, newFontsize)  
    }
    

    const { changeBackground } = useAppActions()
    const [newBackgroundValue, setNewBackgroundValue] = useState('#000000')
    const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBackgroundValue(event.target.value)
    }
    const onChangeBackgroundColor = () => {
        changeBackground(
            selectedSlideId,
            newBackgroundValue,
            'solid'
        )
    }
    const onChangeBackgroundImage = () => {
        changeBackground(
            selectedSlideId,
            newBackgroundValue,
            'src'
        )
    }
    
    const { changeElementColor } = useAppActions()
    const [newColor, setNewColor] = useState('black') 
    const handleElemColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewColor(event.target.value)
    }
    const onChangeElemColor = () => {
        changeElementColor(selectedSlideId, selectedElemId, newColor)
    }
    //реализовать этот функционал

    const { addSlide } = useAppActions()

    const { removeSlide } = useAppActions()
    const onRemoveSlide = () => {
        removeSlide(selectedSlideId)        
    }
    
    const { removeElement } = useAppActions()
    const onRemoveElement = () => {
        removeElement(
            selectedSlideId,
            selectedElemId
        )
    }

    return(
        <div className={style.toolBar}>
            <button onClick={addSlide} className={style.toolBar__tool}>New Slide</button>
            <button onClick={onRemoveSlide} className={removeSlideClassName}>Remove Slide</button>
            <button onClick={onRemoveElement} className={removeObjectClassName}>Remove Element</button>
            <InsertTool 
                selectedSlideId={selectedSlideId}
                insertButtonStyle={style.toolBar__tool}
            />
            <div>
                <button className={style.toolBar__tool} onClick={changeBackgroundOpened}>Change background
                </button>
                {backgroundOpened 
                    && <div className={style.objectList + ' ' + style.insertSection}>
                            <button onClick={() => {onClickChangePopupVisible('color')}}>Set color</button>
                            <button onClick={handleClick}>Set local image
                                <input id='image' type='file' style={{display: 'none'}} ref={ref}></input>
                            </button>   
                            <button onClick={() => {onClickChangePopupVisible('image')}}>Set outher image</button>
                    </div>
                }
            </div>
            {selectedElemType === 'text' && 
                <>
                    <div className={textPropertyClassName}>
                        <input className={style.toolBar__tool_textProperties__font_input} 
                            type="text" 
                            defaultValue={newFont} 
                            onChange={onChangeFont} 
                            onKeyDown={setFontSubmit}
                        />
                        <input className={style.toolBar__tool_textProperties__font_input + ' ' + style.toolBar__tool_textProperties__textSize} 
                            type="number" 
                            defaultValue={newFontsize}
                            onChange={onChangeTextSize}
                            onKeyDown={setTextSizeSubmit}
                        />
                        <div className={style.toolBar__colors_textColor}>
                            <div className={style.toolBar__colors__colorBlock}>
                                <div className={style.toolBar__colors__colorBlock__Icon}
                                    onClick={() => onClickChangePopupVisible('elemColor')}    
                                >
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
                        <div className={style.toolBar__colors__colorBlock__Icon} onClick={() => onClickChangePopupVisible('elemColor')}>
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
                        handleInputChange={handleBackgroundChange}
                        onSubmit={onChangeBackgroundImage}
                        onClose={changePopupOpened}
                    />}
                {popupType === 'color' && <Form
                        title='Выберите цвет фона'
                        inputType='color'
                        handleInputChange={handleBackgroundChange}
                        onSubmit={onChangeBackgroundColor}
                        onClose={changePopupOpened}
                    />}
                {popupType === 'elemColor' && <Form
                        title='Выберите цвет'
                        inputType='color'
                        handleInputChange={handleElemColorChange}
                        onSubmit={onChangeElemColor}
                        onClose={changePopupOpened}
                    />}
            </Popup>
        </div>
    )
}

export{
    Toolbar
}

