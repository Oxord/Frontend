import { useAppSelector } from '../../hooks/useAppSelector'
import { useEffect, useState } from 'react'
import { Slide } from '../Slide/Slide'
import style from './SlideShow.module.css'
import { useNavigate } from 'react-router-dom'

const SlideShow = () => {
    const slides = useAppSelector(state => state.slides) 

    const BASE_WIDTH = 950
    const BASE_HEIGHT = 525

    const getScale = () => {
        const widthScale = window.innerWidth / BASE_WIDTH
        const heightScale = window.innerHeight / BASE_HEIGHT
        return Math.min(widthScale, heightScale)
    }

    const [scale, setScale] = useState(getScale())

    useEffect(() => {
        const handleResize = () => {
            setScale(getScale())
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const [selectedSlideNum, setSelectedSlidesNum] = useState(0)
    const changeSlideNum = (flag: '+' | '-') => {
        if (flag == '+' && selectedSlideNum < slides.length - 1) {
            setSelectedSlidesNum(selectedSlideNum + 1)
        }
        if (flag == '-' && selectedSlideNum > 0) {
            setSelectedSlidesNum(selectedSlideNum - 1)
        } 
    }
    const [selectedSlidesId, setSelectedSlidesId] = useState(slides[selectedSlideNum].id)
    useEffect(() => {
        if (selectedSlideNum >= 0 &&  selectedSlideNum <= slides.length - 1) {
            setSelectedSlidesId(slides[selectedSlideNum].id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSlideNum])
    
    let nextSlideToolClassName = style.tool
    if (selectedSlideNum === slides.length - 1) {
        nextSlideToolClassName = style.tool + ' ' + style.tool_notAvailable
    }
    else {
        nextSlideToolClassName = style.tool + ' ' + style.tool_available
    }
    let previousSlideToolClassName = style.tool
    if (selectedSlideNum === 0) {
        previousSlideToolClassName = style.tool + ' ' + style.tool_notAvailable
    }
    else {
        previousSlideToolClassName = style.tool + ' ' + style.tool_available
    }

    const SLIDE_WIDTH = window.innerWidth 
    const SLIDE_HEIGHT = window.innerHeight - 5
    const selectedSlide = slides.find(s => s.id === selectedSlidesId)
    const navigate = useNavigate()
    return (    
        <div className={style.slideShow} style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: `${BASE_WIDTH}px`,
                height: `${BASE_HEIGHT}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
                pointerEvents: 'none'
            }}>
                {selectedSlide &&
                    <Slide 
                        slide={selectedSlide} 
                        scale={1}
                        width={BASE_WIDTH}
                        height={BASE_HEIGHT}
                        isSelected={false}
                        showSelection={false}
                        onElemClick={() => {}}
                        selectedElemId={''}
                    />
                }
            </div>
            
            <div className={style.slideShow__tools}>
                <button 
                    onClick={() => navigate('/', { replace: false })} 
                    className={style.tool}
                >
                    Back
                </button>
                <button 
                    onClick={() => changeSlideNum('-')}
                    className={previousSlideToolClassName}    
                >
                    Previous
                </button>
                <button 
                    onClick={() => changeSlideNum('+')}
                    className={nextSlideToolClassName}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default SlideShow