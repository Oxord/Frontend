import { Provider } from 'react-redux';
import App from './App.tsx'
import './index.css'
// import { StrictMode } from 'react'
import {addEditorChangeHandler} from "./store/editor.ts";
import { createRoot } from 'react-dom/client';
import { store } from './store/store.ts';

const root = createRoot(document.getElementById('root')!)
function render() {
  root.render(
      <Provider store={store}>
        <App/>
        {/* <App editor={getEditor()}/> */}
      </Provider>
  )
}

addEditorChangeHandler(render)
render()