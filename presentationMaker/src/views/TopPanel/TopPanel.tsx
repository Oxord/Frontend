import { PresNameInput } from "../PresNameInput/PresNameInput"
import { Toolbar } from "../Toolbar/Toolbar"

const TopPanel = () => {
    const onAddImage = () => {}
    const onAddText = () => {}
    const onClickInsert = () => {}
    const onExport = () => {}
    const onAddSlide = () => {}
    const onRemove = () => {}
    const onAddFigure = () => {}
    const onChange = () => {}
    return(
        <div>
            <PresNameInput onChange={onChange}/>
            <Toolbar
                onAddSlide={onAddSlide}
                onRemove={onRemove}
                onAddFigure={onAddFigure}
                onAddImage={onAddImage}
                onAddText={onAddText}
                onClickInsert={onClickInsert}
                onExport={onExport}
            />
        </div>
    )
}

export{
    TopPanel
}