import { useRef, useState } from "react"
import { FigureType } from "../../store/types"
import style from './InsertTool.module.css'
import { insertImage } from "../../store/Actions/insertImage"
import { dispatch } from "../../store/editor"
import { PopupCover } from "../../components/Popup/PopupCover"
import { Popup } from '../../components/Popup/Popup'
import { Form } from "../../components/Forms/Form"

export type InsertToolProps = {
    onAddFigure: (figureType: FigureType) => void
    onAddText: () => void
    insertButtonStyle: string
    slideId: string
}

export const InsertTool = ({ onAddFigure, onAddText, insertButtonStyle, slideId }: InsertToolProps) => {
    
    const ref = useRef<HTMLInputElement | null>(null)
    
    const handleClick = () => {
        if (ref.current) ref.current.click()
    }
    
    const onAddImage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0]

        if (file) { 
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const src = reader.result; 
                if (src) {
                    dispatch(insertImage, {slideId, src})
                }
                else{
                    alert('Не удалось добавить файл:(')
                }
            }
            reader.readAsDataURL(file)
            changeInsertToolOpened()
        } 
    }

    const [figureInsertOpened, setFigureInsertOpened] = useState(false)
    const changeFigureInsertOpened = () => {
        setFigureInsertOpened(!figureInsertOpened)
    }
    const [imageInsertOpend, setimageInsertOpend] = useState(false)
    const changeImageInsertOpend = () => {
        setimageInsertOpend(!imageInsertOpend)
    }
    const [popupOpened, setPopupOpened] = useState(false)
    const changePopupOpened = () => {
        setPopupOpened(!popupOpened)
    }
    const [insertToolOpened, setInsertToolopened] = useState(false)
    const changeInsertToolOpened = () => {
        setInsertToolopened(!insertToolOpened);
        if (imageInsertOpend){
            changeImageInsertOpend()
        }
        if (figureInsertOpened){
            changeFigureInsertOpened()
        }
        if(popupOpened){
            changePopupOpened()
        }
    }

    const [inputImgValue, setInputImgValue] = useState('')

    const handleInputImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputImgValue(event.target.value)
    }

    const onAddImageFromURL = () => {
        const src = inputImgValue
        if (src) {
            dispatch(insertImage, {slideId, src})
        }
        else{
            alert('Не удалось добавить файл:(')
        }
    }

    return(
        <>
            <div className={''}>
                <button onClick={changeInsertToolOpened}
                className={insertButtonStyle}>Insert</button>
                    {insertToolOpened && 
                        <div className={style.objectList + ' ' + style.insertSection}>
                            <div>
                                <button className={''} onClick={() => {changeFigureInsertOpened(); if(imageInsertOpend){changeImageInsertOpend()}}}>
                                    Figure
                                </button>    
                                    {figureInsertOpened && <div className={style.insertSection__figure_objects}>
                                        <div onClick={() => {onAddFigure('circle'); changeInsertToolOpened()}} className={style.insertSection__figure_objects__figure}>
                                            <svg width='45' height='45'>
                                                <circle cx="22" cy="22" r="20" fill='none' stroke='rgba(255, 113, 0, 1)' strokeWidth={'3px'} />
                                            </svg> 
                                        </div>
                                        <div onClick={() => {onAddFigure('rectangle'); changeInsertToolOpened()}} className={style.insertSection__figure_objects__figure}>
                                            <svg width='45' height='45' fill='none' stroke='rgba(255, 113, 0, 1)' strokeWidth={'3px'}>
                                                <rect x="2" y="2" width="40" height="40"></rect>
                                            </svg>
                                        </div>
                                        <div onClick={() => {onAddFigure('triangle'); changeInsertToolOpened()}} className={style.insertSection__figure_objects__figure}>
                                            <svg width='45' height='45' fill='none' stroke='rgba(255, 113, 0, 1)' strokeWidth={'3px'}> 
                                                <polygon x={'30'} y={'15'} points=" 0, 44, 22, 4, 44, 44 " />
                                            </svg>
                                        </div>
                                    </div>}
                            </div>
                            <div>
                                <button onClick={() => {changeImageInsertOpend(); if(figureInsertOpened){changeFigureInsertOpened()}}}>Image
                                </button>
                                    {imageInsertOpend &&
                                        <div className={style.insertSection__image_objects}>
                                            <button onClick={handleClick}>
                                                <label form='image'>
                                                    С компьютера
                                                </label>
                                                <input id='image' type='file' accept=".jpg, .jpeg, .png, .gif" style={{display: 'none'}} ref={ref} onChange={e => onAddImage(e)}></input>
                                            </button>
                                            <button onClick={changePopupOpened}>
                                                Из другого сервиса
                                            </button>
                                        </div>
                                    }  
                            </div>
                            <div>
                                <button onClick={() => {
                                    changeInsertToolOpened();
                                    onAddText()}
                                }>Text field</button>
                            </div>
                        </div>
                    }
                    <PopupCover isVisible={popupOpened}/>
                    <Popup isVisible={popupOpened}>
                        <Form
                            title='URL изображения:'
                            inputType='text'
                            handleInputChange={handleInputImgChange}
                            onSubmit={onAddImageFromURL}
                            onClose={changePopupOpened}
                        />
                    </Popup>
            </div>
        </>
        
    )
} 