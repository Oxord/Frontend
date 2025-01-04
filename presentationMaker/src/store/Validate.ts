import { EditorType } from "./EditorType"
import Ajv from 'ajv'
import ValidateSchema from './ValidateSchema.json'

const validate = (content: string): EditorType | null => {
    const ajv = new Ajv()
    const validate = ajv.compile(ValidateSchema)
    try{
        const jsonData = JSON.parse(content)
        const name = jsonData.name
        const slides = jsonData.slides
        const importEditor: EditorType = {presentation: {name, slides}}
        const valid = validate(importEditor.presentation)
        if (valid) {
            return importEditor
        }
        else{
            return null
        }
    }
    catch{
        alert('Ошибка при парсинге JSON')
        return null
    }
}

export{
    validate
}