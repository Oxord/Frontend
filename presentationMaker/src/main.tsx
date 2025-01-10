import { Provider } from 'react-redux';
import App from './App.tsx'
import './index.css'
import { createRoot } from 'react-dom/client'
import { store } from './store/store.ts'

const root = createRoot(document.getElementById('root')!)
function render() {
  root.render(
      <Provider store={store}>
        <App/>
      </Provider>
  )
}

render()