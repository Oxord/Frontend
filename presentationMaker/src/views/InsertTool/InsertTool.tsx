import { FigureType } from "../../store/types"
import style from './InsertTool.module.css'

export type InsertToolProps = {
    onClickInsert: () => void
    onAddFigure: (figureType: FigureType) => void
    onAddImage: () => void
    onAddText: () => void
    insertButtonStyle: string
}

export const InsertTool = ({ onClickInsert, onAddFigure, onAddImage, onAddText, insertButtonStyle }: InsertToolProps) => {
    const insertToolopened = false
    const figureInsertOpened = false
    const imageInsertOpend = false
    return(
        <>
            <button onClick={onClickInsert}
            className={insertButtonStyle}> Вставка</button>
                {insertToolopened && 
                    <div className={style.objectList}>
                        <div>Фигура
                            {figureInsertOpened && <div>
                                <div onClick={() => {onAddFigure('rectangle')}}>
                                    <svg width={10} height={10}>
                                        <rect></rect>
                                    </svg>
                                </div>
                                <div onClick={() => {onAddFigure('triangle')}}>
                                    <svg>
                                        <polygon points="1, 1, 2, 2, 3, 3">
                                        </polygon>
                                    </svg>
                                </div>
                                <div onClick={() => {onAddFigure('circle')}} color="red">
                                    <svg>
                                        <circle radius="5"></circle>
                                    </svg>
                                </div>
                            </div>}
                        </div>    
                        <div>Картинка
                            {imageInsertOpend &&
                                <div>
                                    <button onClick={onAddImage}>
                                        С компьютера
                                    </button>
                                    <button onClick={onAddImage}>
                                        Из другого сервиса
                                    </button>
                                </div>
                            }
                        </div>
                        <button onClick={onAddText}>Текстовое поле</button>
                    </div>
                }
        </>
        
    )
} 