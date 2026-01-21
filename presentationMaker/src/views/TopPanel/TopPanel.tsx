import { Favicon } from "../Favicon/Favicon"
import { PresNameInput } from "../PresNameInput/PresNameInput"
import { ExportTool } from "../Toolbar/ExportTool"
import { ImportTool } from "../Toolbar/ImportTool"
import style from './TopPanel.module.css'
import { HistoryTool } from "../Toolbar/HistoryTool"
import { useNavigate } from "react-router-dom"
// import { PopupCover } from "../../components/Popup/PopupCover"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import Preloader from "../Preloader/Preloader"
import { PopupCover } from "../../components/Popup/PopupCover"
import { PresentationList } from "../PresentationList/PresentationList"
import { Popup } from "../../components/Popup/Popup"

type TopPanelProps = {
    onUndo: () => void
    onRedo: () => void
    onLoadCloudPresentation?: (id: string) => void
    onCreateNew: () => void 
}

const TopPanel = ({onUndo, onRedo, onLoadCloudPresentation, onCreateNew }: TopPanelProps) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { logout } = useAuth()
    const onLoading = (value: boolean) => {
        setLoading(value)
    }
    const [isListOpen, setIsListOpen] = useState(false);

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
                <button 
                    className={style.toolBar__tool} 
                    onClick={() => setIsListOpen(true)}
                    style={{ backgroundColor: 'rgba(0, 100, 200, 1)' }} // Чуть другой цвет для отличия
                >
                    My Files
                </button>
                {/* <ImportTool/> */}
                <ExportTool
                    onLoading={onLoading}
                />
                <div style={{ marginLeft: '10px'}}>
                     <button onClick={logout} className={style.toolBar__tool_logout}>
                        Logout
                    </button>
                </div>
            </div>
            <PopupCover isVisible={isListOpen} />
            <Popup isVisible={isListOpen}>
                <div style={{color: 'white', fontSize: '20px', marginBottom: '10px'}}>My Presentations</div>
                
                {/* Добавляем проверку isListOpen, чтобы компонент обновлялся при каждом открытии */}
                {isListOpen && (
                    <PresentationList 
                        onClose={() => setIsListOpen(false)} 
                        onSelect={(id) => onLoadCloudPresentation && onLoadCloudPresentation(id)} 
                        onCreateNew={onCreateNew} 
                    />
                )}
                
                <button 
                    onClick={() => setIsListOpen(false)} 
                    style={{marginTop: '20px', padding: '5px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer'}}
                >
                    Close
                </button>
            </Popup>
            
            {loading && <Preloader />}
        </div>
    )
}

export{
    TopPanel
}

