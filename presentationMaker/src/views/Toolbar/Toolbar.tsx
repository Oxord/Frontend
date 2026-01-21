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
import { useAppSelector } from "../../hooks/useAppSelector"

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

    const SLIDE_WIDTH = 950
    const SLIDE_HEIGHT = 525
    const slides = useAppSelector(state => state.slides)
    const currentSlide = slides.find(s => s.id === selectedSlideId)
    const selectedElement = currentSlide?.objects.find(obj => obj.id === selectedElemId)

    const { changeElementPosition } = useAppActions()

    const alignCenter = () => {
        if (!selectedElement) return
        
        const newX = (SLIDE_WIDTH / 2) - (selectedElement.width / 2)
        const newY = (SLIDE_HEIGHT / 2) - (selectedElement.height / 2)
        
        changeElementPosition(selectedSlideId, selectedElemId, { X: newX, Y: newY })
    }

    const alignHorizontally = () => {
        if (!selectedElement) return
        const newX = (SLIDE_WIDTH / 2) - (selectedElement.width / 2)
        changeElementPosition(selectedSlideId, selectedElemId, { X: newX, Y: selectedElement.position.Y })
    }

    const alignVertically = () => {
        if (!selectedElement) return
        const newY = (SLIDE_HEIGHT / 2) - (selectedElement.height / 2)
        changeElementPosition(selectedSlideId, selectedElemId, { X: selectedElement.position.X, Y: newY })
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

    const { changeTextAlign } = useAppActions()

    // const allFonts: string[] = ['arial', 'cursive', 'bold', 'serif']
    // Список безопасных веб-шрифтов, которые есть почти везде
    const allFonts: string[] = [
        'Arial',
        'Verdana',
        'Times New Roman',
        'Courier New',
        'Georgia',
        'Tahoma',
        'Trebuchet MS',
        'Impact',
        'Palatino Linotype'
    ]

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
            {selectedElemId && (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button onClick={alignCenter} className={style.toolBar__tool} style={{width: '60px', minWidth: 'auto'}} title="Center both">C</button>                  
                    <button onClick={alignHorizontally} className={style.toolBar__tool} style={{width: '60px', minWidth: 'auto'}}>H</button>
                    <button onClick={alignVertically} className={style.toolBar__tool} style={{width: '60px', minWidth: 'auto'}}>V</button> 
                   
                </div>
            )}
            {selectedElemType === 'text' && 
                <>
                    <div className={textPropertyClassName}>
                        <select id="fontValuesList" 
                                value={newFont} 
                                onChange={onChangeFont}  
                                className={style.toolBar__tool_textProperties__font_input}
                                style={{ fontFamily: newFont }}
                            >
                            {allFonts.map((value, key) => {
                                return (
                                    <option key={key} value={value} style={{ fontFamily: value }}>
                                        {value}
                                    </option>
                                )
                            })}
                        </select>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', gap: '5px'}}>
                            <button 
                                onClick={() => changeTextAlign(selectedSlideId, selectedElemId, 'left')}
                                style={{background: 'none', border: '1px solid white', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '12px', width: '25px', height: '25px'}}
                                title="Align Left"
                            >
                                L
                            </button>
                            <button 
                                onClick={() => changeTextAlign(selectedSlideId, selectedElemId, 'center')}
                                style={{background: 'none', border: '1px solid white', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '12px', width: '25px', height: '25px'}}
                                title="Align Center"
                            >
                                C
                            </button>
                            <button 
                                onClick={() => changeTextAlign(selectedSlideId, selectedElemId, 'right')}
                                style={{background: 'none', border: '1px solid white', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '12px', width: '25px', height: '25px'}}
                                title="Align Right"
                            >
                                R
                            </button>
                        </div>
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

