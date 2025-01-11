import { RefObject, useEffect } from "react"
import { fromEventToCoordinate } from "../store/fromEventToCoordinate"

const useDragAndDrop = (
    draggableObject: RefObject<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setPos: Function,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onChangeSlideObjectPosition: Function,
    isSelected: boolean,
    slideRef: RefObject<HTMLElement>
) => {
    useEffect(() => {
        let objectWidth = 0
        let objectHeight = 0
        let isObjectMoved: boolean = false

        const onMouseMove = (event: MouseEvent) => {
            isObjectMoved = true
            const newPos = fromEventToCoordinate(slideRef, event)
            if (newPos) {
                if (draggableObject.current) {
                    objectWidth = draggableObject.current.offsetWidth
                    objectHeight = draggableObject.current.offsetHeight
                }
                newPos.X = newPos.X - objectWidth / 2
                newPos.Y = newPos.Y - objectHeight / 2
            }
            setPos(newPos)
            
        }

        const onMouseUp = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMove)
                const newPos = fromEventToCoordinate(slideRef, event)
                if (newPos && isObjectMoved) {
                    newPos.X = newPos.X - objectWidth / 2
                    newPos.Y = newPos.Y - objectHeight / 2
                    onChangeSlideObjectPosition(newPos)
                }
            }
            isObjectMoved = false
        }

        const onMouseDown = () => {
            if (draggableObject.current && slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMove)
                draggableObject.current.addEventListener('mouseup', onMouseUp)
            }
        }

        if (draggableObject.current) {
            draggableObject.current.addEventListener('mousedown', onMouseDown)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelected])
}

export {
    useDragAndDrop
}
