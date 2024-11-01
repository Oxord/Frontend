import style from './ToolBar.module.css'
type ExportToolProps = {
    onExport: () => void
}

const ExportTool = ({onExport}: ExportToolProps) => {
    return(
        <button onClick={onExport} className={style.toolBar__tool + ' ' + style.toolBar__tool_export}>Export</button>
    )
}

export{
    ExportTool
}