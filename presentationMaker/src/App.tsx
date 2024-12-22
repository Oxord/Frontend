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
import { PopupCover } from './components/Popup/PopupCover'
import { Popup } from './components/Popup/Popup'
import { ImageForm } from './components/Forms/ImageForm/ImageForm'
import { ColorForm } from './components/Forms/ColorForm/ColorForm'

type AppProps = {
    editor: EditorType
}

function App({editor}: AppProps) {
    //выделенны объекты по аналогии
    const [selectedSlideId, setSelectedSlideId] = useState(editor.presentation.slides[0].id)
    useEffect(() => {
        if (editor.presentation.slides.length > 0) {
            setSelectedSlideId(editor.presentation.slides[editor.presentation.slides.length - 1].id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor.presentation.slides.length])
    console.log(selectedSlideId)
    const slide: SlideType | undefined = editor.presentation.slides.find(s => s.id === selectedSlideId)

    const [selectedElems, setSelectedElems] = useState([] as string[])
    useEffect(() => {
        setSelectedElems([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slide?.id])
    
    let selectedElemType: string = ''
    let selectedElemColor: string | null = null
    if (selectedElems.length === 1){
        const selectedElem = slide?.objects.find(o => o.id === selectedElems[0])
        selectedElemType = selectedElem? selectedElem?.type: ''
        switch (selectedElem?.type){
            case 'circle': 
                selectedElemColor = selectedElem?.color
                break
            case 'rectangle': 
                selectedElemColor = selectedElem?.color
                break
            case 'triangle': 
                selectedElemColor = selectedElem?.color
                break
            // case 'text': 
            //     selectedElemColor = selectedElemType?.font
            //     break
            default: 
                selectedElemColor = null
                break
        }
    }

    const onElemClick = (elemId: string) => {
        if (selectedElems?.includes(elemId)){
            setSelectedElems( selectedElems?.filter(e => e !== elemId) )
        }
        else{
            if (selectedElems === undefined){
                setSelectedElems([elemId])
            } 
            else{
              setSelectedElems([...selectedElems, elemId])
            }
        }
    }

    const onChangePresName: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }

    const onAddSlide: React.ChangeEventHandler = () => {
        const slideId = generateGuid()
        dispatch(addSlide, {slideId})  
    }

    const onExport = () => {}
    
    const onRemoveSlide: React.ChangeEventHandler = () => {
        dispatch(deleteSlide, selectedSlideId)
    }

    const onClickSlide = (slide: SlideType) => {
        setSelectedSlideId(slide.id)
    }
    const SLIDE_WIDTH = 950
    const SLIDE_HEIGHT = 525
    const selectedSlide = editor.presentation.slides.find(s => s.id === selectedSlideId)

    const [popupOpened, setPopupOpened] = useState(false)
    const changePopupOpened = () => {
        setPopupOpened(!popupOpened)
    }
    return (
        <>
            <TopPanel
                onChangePresName={onChangePresName}
                onExport={onExport}
                presentationName={editor.presentation.name}
            />
            <Toolbar 
                onAddSlide={onAddSlide}
                isRemoveObjAvailable={selectedElems? true: false}
                onRemoveSlide={onRemoveSlide}
                onChangeBackground={changePopupOpened}
                onExport={onExport}
                slideId={selectedSlideId}
                isRemoveSlideAvailable={editor.presentation.slides.length > 1}
                selectedElems={selectedElems}//fix this moment
                selectedElemType={selectedElemType}
                selectedElemColor={selectedElemColor}
            />
            <div className={styles.slides}>
                <SlideList 
                    presentation={editor.presentation}
                    selectedSlideId={selectedSlideId}
                    onSendData={onClickSlide}
                    selectedElemsId={selectedElems? selectedElems: []}//fix this moment
                />
                {selectedSlide &&
                <div className={styles.slides__workArea}>
                    <Slide slide={selectedSlide} 
                        scale={1} 
                        width={SLIDE_WIDTH} 
                        height={SLIDE_HEIGHT} 
                        isSelected={null}
                        showSelection={true}
                        onElemClick={onElemClick}
                        selectedElemsId={selectedElems? selectedElems: []}//fix this moment
                        />
                </div>}
            </div>
            <PopupCover isVisible={popupOpened}/>
                <Popup isVisible={popupOpened}>
                    <ColorForm
                        slideId={selectedSlide?.id}
                        onClose={changePopupOpened}
                    />
                    <ImageForm
                        slideId={selectedSlide?.id} 
                        onClose={changePopupOpened} 
                    />
            </Popup> 
            
        </>
    )
}

export default App
