import { EditorType } from './EditorType.ts'
import {editor} from './MaxData.ts'

let _editor: EditorType
let _handler = null 
const KEY = 'editor'

setEditor(editor)


function getEditor() {
    return _editor
}

function setEditor(newEditor: EditorType) {
    const serializedValue = localStorage.getItem(KEY)
    if (serializedValue) {
        _editor = JSON.parse(serializedValue)
    } 
    else{
        _editor = newEditor
    }
}

function importEditor(editor: EditorType){
    saveToLocalStorage(editor)
    setEditor(editor)
    if (_handler) {
        _handler()
    }
}

const saveToLocalStorage = (editor: EditorType) => {
    const serializedValue = JSON.stringify(editor)
    localStorage.setItem(KEY, serializedValue)  
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
    importEditor
}