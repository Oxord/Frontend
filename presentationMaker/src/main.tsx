import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import { createRoot } from 'react-dom/client'
import store from './store/store.ts'
import { initHistory } from './store/history.ts'
import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SlideShow from './views/SlideShow/SlideShow.tsx'

const root = createRoot(document.getElementById('root')!)
function render() {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<App history={initHistory(store)}/>}></Route>
            <Route path='preview' element={<SlideShow/>}/>
            {/* <App history={initHistory(store)}/> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

render()