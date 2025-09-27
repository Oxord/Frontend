import { Favicon } from "../Favicon/Favicon"
import { PresNameInput } from "../PresNameInput/PresNameInput"
import { ExportTool } from "../Toolbar/ExportTool"
import { ImportTool } from "../Toolbar/ImportTool"
import style from './TopPanel.module.css'
import { HistoryTool } from "../Toolbar/HistoryTool"
import { useNavigate } from "react-router-dom"
import { PopupCover } from "../../components/Popup/PopupCover"
import { useState } from "react"

type TopPanelProps = {
    onUndo: () => void
    onRedo: () => void
}

const TopPanel = ({onUndo, onRedo}: TopPanelProps) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const onLoading = (value: boolean) => {
        setLoading(value)
    }
    return(
        <div className={style.topPanel}>
            <div className={style.topPanel__icon_and_name}>
                <Favicon/>
                <PresNameInput/>
            </div>
            <div className={style.topPanel__tools}>
                <div>
                    <button 
                        onClick={() => navigate('preview', { replace: false })} 
                        className={style.toolBar__tool}
                    >
                        Preview
                    </button>
                </div>
                <HistoryTool 
                    onClick={onUndo}
                    label="Undo"
                />
                <HistoryTool 
                    onClick={onRedo}
                    label="Redo"
                />
                <ImportTool/>
                <ExportTool
                    onLoading={onLoading}
                />
            </div>
            {loading && <>
                <PopupCover isVisible={true}/>
                <div className={style.loader}>Loading...</div>
            </>}
        </div>
    )
}

export{
    TopPanel
}

