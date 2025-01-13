import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import { createRoot } from 'react-dom/client'
import store from './store/store.ts'
import { initHistory } from './store/history.ts'
import { StrictMode } from 'react'

const root = createRoot(document.getElementById('root')!)
function render() {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App history={initHistory(store)}/>
      </Provider>
    </StrictMode>
  )
}

render()