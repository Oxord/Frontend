import styles from './App.module.css'
import { Slide } from './views/Slide/Slide'
import { SlideList } from './views/SlidesList/SlideList'
import { Toolbar } from './views/Toolbar/Toolbar'
import { TopPanel } from './views/TopPanel/TopPanel'
import { EditorType } from './store/EditorType'
import { dispatch } from './store/editor'
import { renamePresentationTitle } from './store/Actions/renamePresentation'
import { generateGuid } from './store/actions'
import { addSlide } from './store/Actions/addSlide'
import { deleteSlide } from './store/Actions/deleteSlide'
import { useEffect, useState } from 'react'
import { SlideType } from './store/types'

type AppProps = {
  editor: EditorType
}

function App({editor}: AppProps) {

  const [selectedSlideId, setSelectedSlideId] = useState(editor.presentation.slides[0].id)
  useEffect(() => {
    if (editor.presentation.slides.length > 0) {
        setSelectedSlideId(editor.presentation.slides[editor.presentation.slides.length - 1].id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor.presentation.slides.length])

  const onChangePresName: React.ChangeEventHandler = (event) => {
    dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
  }

  const onAddSlide: React.ChangeEventHandler = () => {
    const slideId = generateGuid()
    dispatch(addSlide, {slideId})
    setSelectedSlideId(slideId)
    
  }

  const onExport = () => {}
  const onRemoveObj = () => {}

  const onRemoveSlide: React.ChangeEventHandler = () => {
    dispatch(deleteSlide, selectedSlideId)
  }

  const onClickSlide = (slide: SlideType) => {
    setSelectedSlideId(slide.id)
  }
  const SLIDE_WIDTH = 950
  const SLIDE_HEIGHT = 525
  const selectedSlide = editor.presentation.slides.find(s => s.id === selectedSlideId)
  return (
    <>
      <TopPanel
        onChangePresName={onChangePresName}
        onExport={onExport}
        presentationName={editor.presentation.name}
      />
      <Toolbar 
        onAddSlide={onAddSlide}
        onRemove={onRemoveObj}
        onRemoveSlide={onRemoveSlide}
        onExport={onExport}
        slideId={selectedSlideId}
        isRemoveSlideAvailable={editor.presentation.slides.length > 1}
      />
      <div className={styles.slides}>
        <SlideList 
          presentation={editor.presentation}
          selectedSlideId={selectedSlideId}
          onSendData={onClickSlide}
        />
        {selectedSlide &&
        <div className={styles.slides__workArea}>
          <Slide slide={selectedSlide} 
            scale={1} 
            width={SLIDE_WIDTH} 
            height={SLIDE_HEIGHT} 
            isSelected={null}
            showSelection={true}
            />
        </div>}
      </div>
    </>
  )
}

export default App
