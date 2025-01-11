import style from './ToolBar.module.css'

type HistoryToolProps = {
    onClick: () => void
    label: string
}

const HistoryTool = ({onClick, label}: HistoryToolProps) => {
    return (
        <div>
            <button onClick={onClick} className={style.toolBar__tool}>{label}</button>
        </div>
    )
}

export {
    HistoryTool
}