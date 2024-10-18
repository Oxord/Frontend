import { FigureType } from "../../store/types"

export type InsertToolProps = {
    onClickInsert: () => void
    onAddFigure: (figureType: FigureType) => void
    onAddImage: () => void
    onAddText: () => void
}

export const InsertTool = ({ onClickInsert, onAddFigure, onAddImage, onAddText }: InsertToolProps) => {
    const insertToolopened = true
    const figureInsertOpened = true
    const imageInsertOpend = true
    return(
        <div onClick={onClickInsert}>
            Вставка
            {insertToolopened && 
                <div>
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
                            <div onClick={() => {onAddFigure('circle')}}>
                                <circle radius="5"></circle>
                            </div>
                        </div>}
                    </div>    
                    <div>Картинка
                        {imageInsertOpend &&
                            <div>
                                <div onClick={onAddImage}>
                                    С компьютера
                                </div>
                                <div onClick={onAddImage}>
                                    Из другого сервиса
                                </div>
                            </div>
                        }
                    </div>
                    <div onClick={onAddText}>Текстовое поле</div>
                </div>
            }
        </div>
    )
} 