import { useRef, useState } from "react"
import { InsertTool } from "../InsertTool/InsertTool"
import style from './ToolBar.module.css'
import { Popup } from "../../components/Popup/Popup"
import { PopupCover } from "../../components/Popup/PopupCover"
import { Form } from "../../components/Forms/Form"
import { useAppActions } from "../../hooks/useAppActions"
import { GradientForm } from "../../components/Forms/GradientForm"
import ImageSearch from "../ImageSearcher/ImageSearcher"
import { SlideActionTypes } from "../../store/SlideActionTypes"
import { GradientTypeValues } from "../../store/SlidesAction"

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
    const onAddImage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0]
        if (file) { 
            const reader = new FileReader();
            reader.onloadend = () => {
                const src = reader.result
                if (src as string) {
                    changeBackground(selectedSlideId, src as string, 'src')
                }
                else{
                    alert('Не удалось добавить файл:(')
                }
            }
            reader.readAsDataURL(file)
        } 
    }

    const { changeTextFont } = useAppActions()
    const [newFont, setNewFont] = useState('arial')
    const onChangeFont: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setNewFont(event.target.value)
        changeTextFont(selectedSlideId, selectedElemId, event.target.value) 
    }
    // const setFontSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') 
    //       changeTextFont(selectedSlideId, selectedElemId, newFont)          
    // }

    
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


    const { changeBackgroundGradient } = useAppActions()
    const [gradientValue1, setGradientValue1] = useState('#000000')
    const [gradientValue2, setGradientValue2] = useState('#000000')
    const handleGradientColorChange = (event: React.ChangeEvent<HTMLInputElement>, gradientNum: number) => {
        if (gradientNum === 1) {
            setGradientValue1(event.target.value)
        }
        if (gradientNum === 2) {
            setGradientValue2(event.target.value)
        }
    }

    const [gradientType, setGradientType] = useState<GradientTypeValues>('right')
    const handleGradientTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGradientType(event.target.value as GradientTypeValues)
    }   
    const onChangeGradientBackground = () => {
        changeBackgroundGradient(
            selectedSlideId,
            [
                gradientValue1,
                gradientValue2
            ],
            gradientType
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

    const allFonts: string[] = ['arial', 'cursive', 'bold', 'serif']
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
                                <input id='image' type='file' style={{display: 'none'}} ref={ref} onChange={e => onAddImage(e)}></input>
                            </button>   
                            <button onClick={() => {onClickChangePopupVisible('image')}}>Set outher image</button>
                            <button onClick={() => {onClickChangePopupVisible('gradient')}}>Gradient</button>
                    </div>
                }
            </div>
            {selectedElemType === 'text' && 
                <>
                    <div className={textPropertyClassName}>
                            <select id="fontValuesList" 
                                value={newFont} 
                                onChange={onChangeFont}  
                                className={style.toolBar__tool_textProperties__font_input}    
                            >
                            {allFonts.map((value, key) => {
                                return (
                                    <option key={key}>{value}</option>
                                )
                            })}
                        </select>
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
            {selectedElemType !== 'text' && selectedElemType && 
                <div className={elemColorClassName}>
                    <div className={style.toolBar__colors__colorBlock}>
                        <div className={style.toolBar__colors__colorBlock__Icon} style={{background: 'none'}} onClick={() => onClickChangePopupVisible('elemColor')}>
                            <img src='.\src\assets\fillColor.png' alt="fillColor" className={style.toolBar__colors__colorBlock__Icon__fillColor}/>
                        </div>
                        <div className={style.toolBar__colors__colorBlock__color} style={{ backgroundColor: selectedElemColor }}></div>
                    </div>
                </div>
            }    
            <PopupCover isVisible={popupOpened}/>
            <Popup isVisible={popupOpened}>
                {popupType === 'image' && 
                    <ImageSearch
                        selectedSlideId={selectedSlideId}
                        onClose={changePopupOpened}    
                        actionType={SlideActionTypes.CHANGE_SLIDE_BACKGROUND}
                    />}
                {popupType === 'color' && <Form
                        title='Choose background color'
                        inputType='color'
                        handleInputChange={handleBackgroundChange}
                        onSubmit={onChangeBackgroundColor}
                        onClose={changePopupOpened}
                    />}
                {popupType === 'gradient' && <GradientForm
                        color1={gradientValue1}
                        color2={gradientValue2}
                        gradientType={gradientType}
                        onSubmit={onChangeGradientBackground}
                        handleInputChange={handleGradientColorChange}
                        handleInputTypeChange={handleGradientTypeChange}
                        onClose={changePopupOpened}
                    />}    
                {popupType === 'elemColor' && <Form
                        title='Choose color'
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

