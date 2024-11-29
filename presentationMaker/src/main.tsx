import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import {addEditorChangeHandler, getEditor} from "./store/editor.ts";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!)
function render() {
  root.render(
      <StrictMode>
          <App editor={getEditor()}/>
      </StrictMode>,
  )
}

addEditorChangeHandler(render)
render()