import styles from './App.module.css'
import { Slide } from './views/Slide/Slide'
import { SlideList } from './views/SlidesList/SlideList'
import { Toolbar } from './views/Toolbar/Toolbar'
import { TopPanel } from './views/TopPanel/TopPanel'
import { EditorType } from './store/EditorType'
import { dispatch, importEditor, validateEditor } from './store/editor'
import { renamePresentationTitle } from './store/Actions/renamePresentation'
import { generateGuid } from './store/actions'
import { addSlide } from './store/Actions/addSlide'
import { deleteSlide } from './store/Actions/deleteSlide'
import { useEffect, useState } from 'react'
import { Position, SizeType, SlideType } from './store/types'
import { PopupCover } from './components/Popup/PopupCover'
import { Popup } from './components/Popup/Popup'
import { insertTextField } from './store/Actions/insertTextField'
import { changeSlideObjectPosition } from './store/Actions/changeSlideObjectPosition'
import { changeSlidePosition } from './store/Actions/changeSlidePosition'
import { changeSlideObjectSize } from './store/Actions/changeSlideObjectSize'
import { Form } from './components/Forms/Form'
import { changeBackgroundColor } from './store/Actions/changeBackgroundColor'
import { changeBackgroundImage } from './store/Actions/changeBackgroundImage'

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

    const slide: SlideType | undefined = editor.presentation.slides.find(s => s.id === selectedSlideId)

    const [selectedElems, setSelectedElems] = useState<string[]>([])
    useEffect(() => {
        setSelectedElems([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSlideId, slide?.objects.length])
    
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
            setSelectedElems([...selectedElems, elemId])
        }   
    }

    const onChangePresName: React.ChangeEventHandler = (event) => {
        const newName = (event.target as HTMLInputElement).value
        dispatch(renamePresentationTitle, {newName})
    }

    const onAddSlide = () => {
        const slideId = generateGuid()
        dispatch(addSlide, {slideId})  
    }

    
    const onRemoveSlide = () => {
        dispatch(deleteSlide, selectedSlideId)
    }
    
    const onClickSlide = (slideId: string) => {
        setSelectedSlideId(slideId)
    } 
    
    const onAddText = () => {
        dispatch(insertTextField, {selectedSlideId})
    }
    
    const onChangeSlideObjectPosition = (elemId: string, newPos: Position) => {        
        dispatch(changeSlideObjectPosition, {selectedSlideId, elemId, newPos})
    }
    const onChangeSlideObjectSize = (elemId: string, newSize: SizeType) => {
        dispatch(changeSlideObjectSize, {selectedSlideId, elemId, newSize})
    }
    const onChangeSlidePosition = (newOrder: string[]) => {
        dispatch(changeSlidePosition, newOrder)
    } 
    
    const SLIDE_WIDTH = 950
    const SLIDE_HEIGHT = 525
    const selectedSlide = editor.presentation.slides.find(s => s.id === selectedSlideId)
    
    const [popupOpened, setPopupOpened] = useState(false)
    const changePopupOpened = () => {
        setPopupOpened(!popupOpened)
    }
    
    const [inputColor, setInputColor] = useState('black')
    
    const handleInputColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputColor(event.target.value)
    }
    
    const onChangeBackground = () => {
        const color = inputColor
        dispatch(changeBackgroundColor, {selectedSlideId, color})
    }
    
    const [inputImgValue, setInputImgValue] = useState('')
    
    const handleInputImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputImgValue(event.target.value)
    }
    
    const onAddImage = () => {
        const src = inputImgValue
        if (src) {
            dispatch(changeBackgroundImage, {selectedSlideId, src})
        }
        else{
            alert('Не удалось добавить файл:(')
        }
    }

    const onExport = () => {
        const validEditor = validateEditor()
        if (validEditor){
            const data = {
                name: editor.presentation.name,
                slides: editor.presentation.slides
            }
    
            const jsonString = JSON.stringify(data, null, 2)
            const blob = new Blob([jsonString], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
    
            const a = document.createElement('a')
            a.href = url
            a.download = 'presentation.json' 
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)  
        }
        else{
            alert('Некорректные данные! Такую презентацию нельзя экспортировать')
        }
    }

    const onImport = (editor: EditorType) => {
        importEditor(editor)    
    }

    return (
        <div>
            <TopPanel
                presentationName={editor.presentation.name}
                onChangePresName={onChangePresName}
                onExport={onExport}
                // onImport={onImport}
            />
            <Toolbar 
                onAddSlide={onAddSlide}
                onRemoveSlide={onRemoveSlide}
                onExport={onExport}
                onAddText={onAddText}
                // onChangeBackground={changePopupOpened}
                // isRemoveObjAvailable={selectedElems? true: false}
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
                    onChangeSlide={onClickSlide}
                    selectedElemsId={selectedElems? selectedElems: []}//fix this moment
                    onChangeSlidePosition={onChangeSlidePosition}
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
                        onChangeSlideObjectPosition={onChangeSlideObjectPosition}
                        onChangeSlideObjectSize={onChangeSlideObjectSize}
                    />
                </div>}
            </div>
            <PopupCover isVisible={popupOpened}/>
                <Popup isVisible={popupOpened}>
                    <Form
                        title='Выберите цвет'
                        inputType='color'
                        handleInputChange={handleInputColorChange}
                        onSubmit={onChangeBackground}
                        onClose={changePopupOpened}
                    />                    
                    <Form
                        title='Выберите изображение'
                        inputType='text'
                        handleInputChange={handleInputImgChange}
                        onSubmit={onAddImage}
                        onClose={changePopupOpened}
                    /> 
            </Popup> 
        </div>
    )
}

export default App