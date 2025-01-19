import { Slide } from "./Slide/Slide"
import { SlideList } from "./SlidesList/SlideList"
import { Toolbar } from "./Toolbar/Toolbar"
import { TopPanel } from "./TopPanel/TopPanel"


const Editor = () => {
    const { changePresentationTitle, updateSlides } = useAppActions()
    function onUndo() {
        const newState = history.undo()
        if (newState) {
            changePresentationTitle(newState.title)
            updateSlides(newState.slides)
        }
    }
    function onRedo() {
        const newState = history.redo()
        if (newState) {
            changePresentationTitle(newState.title)
            updateSlides(newState.slides)
        }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === 'z' && (event.ctrlKey || event.metaKey)) {
            onUndo()
        }
        if (event.key.toLowerCase() === 'y' && (event.ctrlKey || event.metaKey)) {
            onRedo()
        }
    }
    return(
        <>
            <TopPanel
                onUndo={onUndo}
                onRedo={onRedo}
            />
            <Toolbar 
                selectedSlideId={selectedSlidesIds[0]}
                isRemoveSlideAvailable={slides.length > 1}
                selectedElemId={selectedElemId}
                selectedElemType={selectedElemType}
                selectedElemColor={selectedElemColor}
            />
            <div className={styles.slides}>
            <SlideList 
                selectedSlidesIds={selectedSlidesIds}
                onClickSlide={onClickSlide}
                onClickSlideWithCtrl={onClickSlideWithCtrl}
                selectedElemId={selectedElemId}
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
                    selectedElemId={selectedElemId}
                    />
            </div>}
        </div>
        </>
    )
}