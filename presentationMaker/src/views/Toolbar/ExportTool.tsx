import { getStateFromLocalStorage } from '../../store/getStateFromLocalStorage'
import style from './ToolBar.module.css'


const ExportTool = () => {
    const onExport = () => {
        const stateLocal = getStateFromLocalStorage()
        if (stateLocal) {
            const data = {
                title: stateLocal.title,
                slides: stateLocal.slides
            }
    
            const jsonString = JSON.stringify(data, null, 2)
            const blob = new Blob([jsonString], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
    
            const a = document.createElement('a')
            a.href = url
            a.download = 'presentation.json' 
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)  
        }
        else{
            alert('Некорректные данные! Такую презентацию нельзя экспортировать')
        }
    }

    return(
        <button onClick={onExport} className={style.toolBar__tool + ' ' + style.toolBar__tool_export}>Export</button>
    )
}

export{
    ExportTool
}