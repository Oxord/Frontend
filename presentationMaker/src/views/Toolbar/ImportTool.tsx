import { useRef } from 'react'
import style from './ToolBar.module.css'
import { EditorType } from '../../store/EditorType'
import { importEditor } from '../../store/editor'
import { validate } from '../../store/Validate'

export type ImportTolProps = {
    onImport: (editor: EditorType) => void
}
const ImportTool = () => {
    const ref = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        ref.current.click()
    }

    const onImport = (editor: EditorType) => {
        importEditor(editor)    
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const content = e.target?.result; 
                if (typeof content === 'string') {
                    const validEditor = validate(content)
                    if (validEditor) {
                        console.log('valid - ', validEditor)
                        onImport(validEditor)
                        
                    }
                    else{
                        alert('Некорректные данные!')   
                    }
                }
            }
            reader.readAsText(file)
        }
        else{
            alert('Не удалось добавить файл:(')
        }
        if (ref.current) {
            ref.current.value = ''
          }
    }
    return(
        <button onClick={handleClick} className={style.toolBar__tool + ' ' + style.toolBar__tool_export}>Import
            <input type="file" accept=".json" style={{display: 'none'}} ref={ref} onChange={e => handleFileChange(e)}/>
            
        </button>
    )
}

export{
    ImportTool
}
