import styles from './App.module.css'
import { Slide } from './views/Slide/Slide'
import { SlideList } from './views/SlidesList/SlideList'
import { Toolbar } from './views/Toolbar/Toolbar'
import { PRESENTATION } from "./store/MaxData"
import { TopPanel } from './views/TopPanel/TopPanel'

function App() {
  const onChangePresName = () => {}
  const onExport = () => {}
  const onAddFigure = () => {}
  const onAddImage = () => {}
  const onAddSlide = () => {}
  const onAddText = () => {}
  const onClickInsert = () => {}
  const onRemoveObj = () => {}
  const SLIDE_WIDTH = 950
  const SLIDE_HEIGHT = 525
  return (
    <>
      <TopPanel
        onChangePresName={onChangePresName}
        onExport={onExport}
      />
      <Toolbar 
        onExport={onExport}
        onAddFigure={onAddFigure}
        onAddImage={onAddImage}
        onAddSlide={onAddSlide}
        onAddText={onAddText}
        onClickInsert={onClickInsert}
        onRemove={onRemoveObj}
      />
      <div className={styles.slides}>
        <SlideList 
          presentation={PRESENTATION}
        />
        <div className={styles.slides__workArea}>
          <Slide slide={PRESENTATION.slides[0]} scale={1} width={SLIDE_WIDTH} height={SLIDE_HEIGHT}/>
        </div>
      </div>
    </>
  )
}

export default App
