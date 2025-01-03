// import { EditorType } from "../../store/EditorType"
import { Favicon } from "../Favicon/Favicon"
import { PresNameInput } from "../PresNameInput/PresNameInput"
import { ExportTool } from "../Toolbar/ExportTool"
import { ImportTool } from "../Toolbar/ImportTool"
import styles from './TopPanel.module.css'

type TopPanelProps = {
    presentationName: string
    onChangePresName: () => void
    onImport: () => void
    onExport: () => void
}

const TopPanel = ({presentationName, onChangePresName, onImport, onExport}: TopPanelProps) => {

    return(
        <div className={styles.topPanel}>
            <div className={styles.topPanel__icon_and_name}>
                <Favicon/>
                <PresNameInput onChange={onChangePresName} presentationName={presentationName}/>
            </div>
            <div className={styles.topPanel__InOutTool}>
                <ImportTool onImport={onImport}/>
                <ExportTool onExport={onExport}/>
            </div>
        </div>
    )
}

export{
    TopPanel
}