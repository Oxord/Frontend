import styles from './App.module.css'
import { Slide } from './views/Slide/Slide'
import { SlideList } from './views/SlidesList/SlideList'
import { Toolbar } from './views/Toolbar/Toolbar'
import { TopPanel } from './views/TopPanel/TopPanel'
import { EditorType } from './store/EditorType'
import { dispatch, validateEditor } from './store/editor'
import { useEffect, useState } from 'react'
import { Position, SizeType, SlideType } from './store/types'
import { insertTextField } from './store/Actions/insertTextField'
import { changeSlideObjectPosition } from './store/Actions/changeSlideObjectPosition'
import { changeSlidePosition } from './store/Actions/changeSlidePosition'
import { changeSlideObjectSize } from './store/Actions/changeSlideObjectSize'
import { useAppSelector } from './hooks/useAppSelector'

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

    const [selectedElemId, setSelectedElemId] = useState('')
    useEffect(() => {
        setSelectedElemId('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSlideId, slide?.objects.length])
    
    let selectedElemType: string = ''
    let selectedElemColor: string | null = null
    if (selectedElemId){
        const selectedElem = slide?.objects.find(o => o.id === selectedElemId)
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
        setSelectedElemId(elemId)     
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
        dispatch(changeSlideObjectSize, {slideId: selectedSlideId, elemId, newSize})//щас пофиксил тут момент со slideId, мб теперь DnD будет норм работать
    }
    const onChangeSlidePosition = (newOrder: string[]) => {
        dispatch(changeSlidePosition, newOrder)
    } 
    
    const SLIDE_WIDTH = 950
    const SLIDE_HEIGHT = 525
    const selectedSlide = editor.presentation.slides.find(s => s.id === selectedSlideId)
    
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
    
    const slides = useAppSelector(state => state.slides)
    console.log(slides)

    return (
        <div>
            <TopPanel
                onExport={onExport}
            />
            <Toolbar 
                onExport={onExport}
                onAddText={onAddText}
                slideId={selectedSlideId}
                isRemoveSlideAvailable={editor.presentation.slides.length > 1}
                selectedElemId={selectedElemId}//fix this moment
                selectedElemType={selectedElemType}
                selectedElemColor={selectedElemColor}
            />
            <div className={styles.slides}>
                <SlideList 
                    selectedSlideId={selectedSlideId}
                    onChangeSlide={onClickSlide}
                    selectedElemId={selectedElemId} //fix this moment
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
                        selectedElemId={selectedElemId}//fix this moment
                        onChangeSlideObjectPosition={onChangeSlideObjectPosition}
                        onChangeSlideObjectSize={onChangeSlideObjectSize}
                    />
                </div>}
            </div>
        </div>
    )
}

export default App