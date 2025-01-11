import Ajv from 'ajv'
import ValidateSchema from './ValidateSchema.json'
import { stateDataType } from './stateDataType'

const validateState = (content: string): stateDataType | null => {
    const ajv = new Ajv()
    const validate = ajv.compile(ValidateSchema)
    try{
        const jsonData = JSON.parse(content)
        const title = jsonData.title
        const slides = jsonData.slides
        const importState = {
            title: title,
            slides: slides
        }
        const valid = validate(importState)
        if (valid) {
            return importState
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
    validateState
}