import { RefObject, useEffect } from "react"
import { fromEventToLocalVec } from "../store/fromEvenToLocalVec"
import { Position } from "../store/types"
function useDragAndDrop(
    draggableObject: RefObject<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setPos: Function,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onChangeSlideObjectPosition: Function,
    isSelected: boolean,
    slideRef: RefObject<HTMLElement>
) {
    useEffect(() => {
        const minXCoord: number = 0
        const minYCoord: number = 0
        const maxXCoord: number | undefined = slideRef.current?.offsetWidth
        const maxYCoord: number | undefined = slideRef.current?.offsetHeight

        const indent = 10

        let objectWidth = 0
        let objectHeight = 0

        function isInSlide(position: Position | undefined): boolean {
            if (position && maxXCoord && maxYCoord) {
                if (position.X > minXCoord + indent &&
                    position.Y > minYCoord + indent &&
                    position.X < maxXCoord - objectWidth - indent &&
                    position.Y < maxYCoord - objectHeight - indent) {
                    return true
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }

        const onMouseMove = (event: MouseEvent) => {
            const newPos = fromEventToLocalVec(slideRef, event)
            if (newPos) {
                if (draggableObject.current) {
                    objectWidth = draggableObject.current.offsetWidth
                    objectHeight = draggableObject.current.offsetHeight
                }
                newPos.X = newPos.X - objectWidth / 2
                newPos.Y = newPos.Y - objectHeight / 2
            }
            if (isInSlide(newPos)) {
                setPos(newPos)
            }
            else {
                slideRef.current?.removeEventListener('mousemove', onMouseMove)
                onChangeSlideObjectPosition(newPos)
            }
        }

        const onMouseUp = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMove)
                const newPos = fromEventToLocalVec(slideRef, event)
                if (newPos) {
                    newPos.X = newPos.X - objectWidth / 2
                    newPos.Y = newPos.Y - objectHeight / 2
                }
                if (isInSlide(newPos)) {
                    onChangeSlideObjectPosition(newPos)
                }                
            }
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
