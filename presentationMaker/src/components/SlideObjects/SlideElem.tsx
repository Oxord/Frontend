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
    isPointActive: boolean
}

export const SlideElem = ( {slideId, elem, isSelected, showSelection, slideRef, isPointActive}: slideObjectProps ) => {
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
    const draggablePointTopLeft = useRef<HTMLDivElement>(null)
    const draggablePointTop = useRef<HTMLDivElement>(null)
    const draggablePointTopRight = useRef<HTMLDivElement>(null)
    const draggablePointMediumLeft = useRef<HTMLDivElement>(null)
    const draggablePointMediumRight = useRef<HTMLDivElement>(null)
    const draggablePointBottomLeft = useRef<HTMLDivElement>(null)
    const draggablePointBottom = useRef<HTMLDivElement>(null)
    const draggablePointBottomRight = useRef<HTMLDivElement>(null)
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
        draggablePointTopLeft,
        draggablePointTop,
        draggablePointTopRight,
        draggablePointMediumLeft,
        draggablePointMediumRight,
        draggablePointBottomLeft,
        draggablePointBottom,
        draggablePointBottomRight,
        setSize,
        setPos,
        slideRef,
        size,
        onChangeSize,
        onChangePosition,
        isPointActive
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
                        width={elem.width * 1} 
                        height={elem.height * 1} 
                    />
            break
        case 'circle':
            elemStyle.width = elem.radius * 2
            elemStyle.height = elem.radius * 2           
            element = <Circle 
                        radius={elem.radius * 1}
                        color={elem.color}
                    />
            break
        case 'rectangle': 
            elemStyle.width = elem.width
            elemStyle.height = elem.height
            element = <Rectangle 
                        width={elem.width * 1} 
                        height={elem.height * 1} 
                        color={elem.color} 
                    />
            break
        case 'triangle': 
            elemStyle.width = elem.width
            elemStyle.height = elem.height
            element = <Triangle 
                        PointOne={elem.pointOne} 
                        PointTwo={elem.pointTwo} 
                        PointThree={elem.pointThree} 
                        width={elem.width * 1} 
                        height={elem.height * 1} 
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
                ref={draggablePointTopLeft}>
            </div>
            <div
                className={topPoint}
                ref={draggablePointTop}>    
            </div>
            <div
                className={topRightPoint}
                ref={draggablePointTopRight}>
            </div>
            <div
                className={mediumLeftPoint}
                ref={draggablePointMediumLeft}>
            </div>
            <div
                className={mediumRightPoint}
                ref={draggablePointMediumRight}>
            </div>
            <div
                className={bottomLeftPoint}
                ref={draggablePointBottomLeft}>
            </div>
            <div
                className={bottomPoint}
                ref={draggablePointBottom}>
            </div>
            <div
                className={bottomRightPoint}
                ref={draggablePointBottomRight}>
            </div>
        </div>
    ) 
}