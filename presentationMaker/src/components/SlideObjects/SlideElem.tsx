import { CSSProperties, RefObject, useEffect, useRef, useState } from "react"
import { Position, SizeType, SlideObject } from "../../store/types"
import { ImageObject } from "./ImageObject/ImageObject"
import { Circle } from "./ImageObject/Shapes/Circle"
import { Rectangle } from "./ImageObject/Shapes/Rectangle"
import { TextObject } from "./TextObject/TextObject"
import { Triangle } from "./ImageObject/Shapes/Triangle"
import styles from './SlideElem.module.css'
import { useDragAndDrop } from "../../hooks/useDragAndDrop"
import { useResize } from "../../hooks/useResize"
import { useAppActions } from "../../hooks/useAppActions"

type slideObjectProps = {
    slideId: string
    isSelected: boolean
    elem: SlideObject
    showSelection: boolean
    slideRef:  RefObject<HTMLElement>
    isResizePointActive: boolean
}

export const SlideElem = ( {slideId, elem, isSelected, showSelection, slideRef, isResizePointActive}: slideObjectProps ) => {
    let elemPoint: string
    let elemClassName: string = styles.elem
    if (isSelected && showSelection) {
        elemClassName = styles.elem + ' ' + styles.elem_selected
        elemPoint = styles.figure__point
    }
    else{
        elemClassName = styles.elem
        elemPoint = styles.disable
    }

    const { changeElementPosition } = useAppActions()
    const draggableObject = useRef<HTMLDivElement>(null)    
    const [pos, setPos] = useState(elem.position)
    useEffect(() => {
        setPos(elem.position)
    }, [elem.position])
    const onChangePosition = (newPos: Position) => 
        changeElementPosition(
            slideId,
            elem.id,
            newPos
        )
    useDragAndDrop(draggableObject, setPos, onChangePosition, isSelected, slideRef)
    
    const { changeElementSize } = useAppActions()
    const objectSizes: SizeType = { width: elem.width, height: elem.height }
    const resizePointTopLeft = useRef<HTMLDivElement>(null)
    const resizePointTop = useRef<HTMLDivElement>(null)
    const resizePointTopRight = useRef<HTMLDivElement>(null)
    const resizePointMediumLeft = useRef<HTMLDivElement>(null)
    const resizePointMediumRight = useRef<HTMLDivElement>(null)
    const resizePointBottomLeft = useRef<HTMLDivElement>(null)
    const resizePointBottom = useRef<HTMLDivElement>(null)
    const resizePointBottomRight = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState(objectSizes)
    useEffect(() => {
        setSize({ width: elem.width, height: elem.height })
    }, [elem.width, elem.height])
    const onChangeSize = (newSize: SizeType) => 
        changeElementSize(
            slideId,
            elem.id, 
            newSize
        )
    useResize(
        resizePointTopLeft,
        resizePointTop,
        resizePointTopRight,
        resizePointMediumLeft,
        resizePointMediumRight,
        resizePointBottomLeft,
        resizePointBottom,
        resizePointBottomRight,
        setSize,
        setPos,
        slideRef,
        size,
        onChangeSize,
        onChangePosition,
        isResizePointActive
    )
    
    const topLeftPoint = elemPoint + ' ' + styles.point_top_left
    const topPoint = elemPoint + ' ' + styles.point_top
    const topRightPoint = elemPoint + ' ' + styles.point_top_right
    const mediumLeftPoint = elemPoint + ' ' + styles.point_medium_left
    const mediumRightPoint = elemPoint + ' ' + styles.point_medium_right
    const bottomLeftPoint = elemPoint + ' ' + styles.point_bottom_left
    const bottomPoint = elemPoint + ' ' + styles.point_bottom
    const bottomRightPoint = elemPoint + ' ' + styles.point_bottom_right

    const elemStyle: CSSProperties = {
        left: pos.X,  
        top: pos.Y,
        position: 'absolute'
    }
    let element = <></>
    switch (elem.type){
        case 'text':
            element = <TextObject 
                        slideId={slideId}
                        text={elem.text} 
                        font={elem.font} 
                        fontSize={elem.fontsize * 1} 
                        isReadOnly={!isSelected}
                        elemId={elem.id}
                        textColor={elem.color}
                    />
            break
        case 'image': 
            element = <ImageObject 
                        src={elem.src} 
                        width={size.width * 1} 
                        height={size.height * 1} 
                    />
            break
        case 'circle':
            elemStyle.width = size.width * 2
            elemStyle.height = size.width * 2           
            element = <Circle 
                        radius={size.width * 1}
                        color={elem.color}
                    />
            break
        case 'rectangle': 
            elemStyle.width = size.width
            elemStyle.height = size.height
            element = <Rectangle 
                        width={size.width * 1} 
                        height={size.height * 1} 
                        color={elem.color} 
                    />
            break
        case 'triangle': 
            elemStyle.width = size.width
            elemStyle.height = size.height
            element = <Triangle 
                        PointOne={elem.pointOne} 
                        PointTwo={elem.pointTwo} 
                        PointThree={elem.pointThree} 
                        width={size.width * 1} 
                        height={size.height * 1} 
                        color={elem.color}
                    />
    }
    return(
        <div style={elemStyle} className={elemClassName}>
            <div ref={draggableObject}>  
                {element}
            </div>  
            <div
                className={topLeftPoint}
                ref={resizePointTopLeft}>
            </div>
            <div
                className={topPoint}
                ref={resizePointTop}>    
            </div>
            <div
                className={topRightPoint}
                ref={resizePointTopRight}>
            </div>
            <div
                className={mediumLeftPoint}
                ref={resizePointMediumLeft}>
            </div>
            <div
                className={mediumRightPoint}
                ref={resizePointMediumRight}>
            </div>
            <div
                className={bottomLeftPoint}
                ref={resizePointBottomLeft}>
            </div>
            <div
                className={bottomPoint}
                ref={resizePointBottom}>
            </div>
            <div
                className={bottomRightPoint}
                ref={resizePointBottomRight}>
            </div>
        </div>
    ) 
}