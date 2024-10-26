import './App.css'
import { PresNameInput } from './views/PresNameInput/PresNameInput'
import { Slide } from './views/Slide/Slide'
import { SlideList } from './views/SlidesList/SlideList'
import { Toolbar } from './views/Toolbar/Toolbar'
import { presentation } from "./store/MinData"

function App() {
  const onChangePresName = () => {}
  const onExport = () => {}
  const onAddFigure = () => {}
  const onAddImage = () => {}
  const onAddSlide = () => {}
  const onAddText = () => {}
  const onClickInsert = () => {}
  const onRemoveObj = () => {}

  return (
    <>
      <PresNameInput onChange={onChangePresName}/>
      <Toolbar 
        onExport={onExport}
        onAddFigure={onAddFigure}
        onAddImage={onAddImage}
        onAddSlide={onAddSlide}
        onAddText={onAddText}
        onClickInsert={onClickInsert}
        onRemove={onRemoveObj}
      />
      <SlideList 
        presentation={presentation}
      />
      <Slide slide={presentation.slides[0]}/>
    </>
  )
}

export default App
