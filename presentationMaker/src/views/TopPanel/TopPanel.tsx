// import { EditorType } from "../../store/EditorType"
import { Favicon } from "../Favicon/Favicon"
import { PresNameInput } from "../PresNameInput/PresNameInput"
import { ExportTool } from "../Toolbar/ExportTool"
import { ImportTool } from "../Toolbar/ImportTool"
import styles from './TopPanel.module.css'

const TopPanel = () => {
    return(
        <div className={styles.topPanel}>
            <div className={styles.topPanel__icon_and_name}>
                <Favicon/>
                <PresNameInput/>
            </div>
            <div className={styles.topPanel__InOutTool}>
                <ImportTool/>
                <ExportTool/>
            </div>
        </div>
    )
}

export{
    TopPanel
}

