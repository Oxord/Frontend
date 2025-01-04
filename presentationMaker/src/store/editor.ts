import { EditorType } from './EditorType.ts'
import { editor } from './initialData.ts'
import { validate } from './Validate.ts'

let _editor: EditorType
let _handler = null 
const KEY = 'presentation'

setEditor(editor)


function getEditor() {
    return _editor
}

function validateEditor(): EditorType | null {
    const content = localStorage.getItem(KEY)
    if (content) {
        const validEditor = validate(content)
        if (validEditor) {
            return validEditor
        }
    } 
    return null
}

function setEditor(newEditor: EditorType) {
    const validEditor = validateEditor()
    if (validEditor) {
        _editor = validEditor
    }
    else{
        _editor = newEditor
    }
}


function importEditor(editor: EditorType) {
    saveToLocalStorage(editor)
    console.log(editor)      
    setEditor(editor)
    if (_handler) {
        _handler()
    }
}

const saveToLocalStorage = (editor: EditorType) => {
    const presentation = JSON.stringify(editor.presentation)
    localStorage.setItem(KEY, presentation)  
}

function dispatch(modifyFn: Function , payload?: Object) {
    const newEditor = modifyFn(_editor, payload)
    saveToLocalStorage(newEditor)
    setEditor(newEditor)
    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
    importEditor,
    validateEditor
}