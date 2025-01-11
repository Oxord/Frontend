import { useRef } from 'react'
import style from './ToolBar.module.css'
import { stateDataType } from '../../store/stateDataType'
import { useAppActions } from '../../hooks/useAppActions'
import { validateState } from '../../store/ValidateState'

const ImportTool = () => {

    const { updateSlides, changePresentationTitle  } = useAppActions()

    const ref = useRef<HTMLInputElement | null>(null)

    const handleClick = () => {
        if (ref.current) ref.current.click()
    }

    const onImport = (state: stateDataType) => {
        updateSlides(state.slides)
        changePresentationTitle(state.title)  
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const content = e.target?.result; 
                if (typeof content === 'string') {
                    const validState = validateState(content)
                    if (validState) {
                        const jsonData = JSON.parse(content)
                        const title = jsonData.title
                        const slides = jsonData.slides
                        const importState = {
                            title: title,
                            slides: slides
                        }    
                    onImport(importState)
                        
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
