import { Favicon } from "../Favicon/Favicon"
import { PresNameInput } from "../PresNameInput/PresNameInput"
import { ExportTool } from "../Toolbar/ExportTool"
import styles from './TopPanel.module.css'

type TopPanelProps = {
    onChangePresName: () => void
    onExport: () => void
}

const TopPanel = ({onChangePresName, onExport}: TopPanelProps) => {
    return(
        <div className={styles.topPanel}>
            <div className={styles.topPanel__icon_and_name}>
                <Favicon/>
                <PresNameInput onChange={onChangePresName}/>
            </div>
            <ExportTool onExport={onExport}/>
        </div>
    )
}

export{
    TopPanel
}