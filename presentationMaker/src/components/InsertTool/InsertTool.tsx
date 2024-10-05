import { FigureType } from "../../store/types"

export type InsertToolProps = {
    onClickInsert: () => void
    onAddFigure: (figureType: FigureType) => void
    onAddImage: () => void
}

export const InsertTool = ({onClickInsert, onAddFigure}: InsertToolProps) => {
    const opened = true
    return(
        <div onClick={onClickInsert}>
            Вставка
            {opened && 
                <div>
                    <div>Фигура
                        {opened && <div>
                            <div onClick={() => {onAddFigure('rectangle')}}>
                                {/* прямоугольник */}
                            </div>
                            <div onClick={() => {onAddFigure('triangle')}}>
                                {/* треугольник */}
                            </div>
                            <div onClick={() => {onAddFigure('circle')}}>
                                {/* круг */}
                            </div>
                        </div>}
                    </div>    
                    <div>Картинка
                        <div>
                            <div>
                                С компьютера
                            </div>
                            <div>
                                Из другого сервиса
                            </div>
                        </div>
                    </div>
                    <div>Текстовое поле</div>
                </div>
            }
        </div>
    )
} 