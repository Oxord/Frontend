import { Favicon } from "../Favicon/Favicon"
import { PresNameInput } from "../PresNameInput/PresNameInput"
import { ExportTool } from "../Toolbar/ExportTool"
import { ImportTool } from "../Toolbar/ImportTool"
import style from './TopPanel.module.css'
import { HistoryTool } from "../Toolbar/HistoryTool"

type TopPanelProps = {
    onUndo: () => void
    onRedo: () => void
}

const TopPanel = ({onUndo, onRedo}: TopPanelProps) => {
    return(
        <div className={style.topPanel}>
            <div className={style.topPanel__icon_and_name}>
                <Favicon/>
                <PresNameInput/>
            </div>
            <div className={style.topPanel__tools}>
                <div className={style.topPanel__tools_tools_container}>
                    <HistoryTool 
                        onClick={onUndo}
                        label="Undo"
                    />
                    <HistoryTool 
                        onClick={onRedo}
                        label="Redo"
                    />
                </div>
                <div className={style.topPanel__tools_tools_container}>
                    <ImportTool/>
                    <ExportTool/>
                </div>
            </div>
        </div>
    )
}

export{
    TopPanel
}

