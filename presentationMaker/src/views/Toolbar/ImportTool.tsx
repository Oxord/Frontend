import { useRef } from 'react'
import style from './ToolBar.module.css'
import { validate } from '../../store/Validate'
import { stateDataType } from '../../store/stateDataType'
import { importState } from '../../store/importState'

const ImportTool = () => {
    const ref = useRef<HTMLInputElement | null>(null)

    const handleClick = () => {
        if (ref.current) ref.current.click()
    }

    const onImport = (state: stateDataType) => {
        importState(state)    
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
