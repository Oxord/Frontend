import { EditorType } from './EditorType.ts'
import {editor} from './MaxData.ts'

let _editor: EditorType
let _handler = null 

setEditor(editor)


function getEditor() {
    return _editor
}

function setEditor(newEditor: EditorType) {
    const serializedValue = localStorage.getItem('editor')
    if (serializedValue) {
        _editor = JSON.parse(serializedValue)
    } 
    else{
        _editor = newEditor
    }
}

async function importEditor(editor: EditorType){
    await saveToLocalStorageAsync(editor)
    console.log(editor)
}

const saveToLocalStorage = (editor: EditorType) => {
    const serializedValue = JSON.stringify(editor)
    localStorage.setItem('editor', serializedValue)  
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

async function saveToLocalStorageAsync(editor: EditorType) {
    const serializedValue = JSON.stringify(editor)
    localStorage.setItem('editor', serializedValue)  
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
    importEditor
}