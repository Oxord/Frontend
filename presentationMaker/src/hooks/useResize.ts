import { RefObject, useEffect } from "react"
import { fromEventToLocalVec } from "../store/fromEvenToLocalVec"
import { Position, SizeType } from "../store/types"
function useResize(
    draggableObject: RefObject<HTMLElement>,
    draggablePointTopLeft: RefObject<HTMLElement>,
    draggablePointTop: RefObject<HTMLElement>,
    draggablePointTopRight: RefObject<HTMLElement>,
    draggablePointMediumLeft: RefObject<HTMLElement>,
    draggablePointMediumRight: RefObject<HTMLElement>,
    draggablePointBottomLeft: RefObject<HTMLElement>,
    draggablePointBottom: RefObject<HTMLElement>,
    draggablePointBottomRight: RefObject<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setSize: Function,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setPos: Function,
    slideRef: RefObject<HTMLElement>,
    size: SizeType,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onChangeSize: Function,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onChangePosition: Function,
    isActive: boolean
) {

    useEffect(() => {

        let startPosition: Position | undefined = { X: 0, Y: 0 }
        let newSize: SizeType = { width: 0, height: 0 }
        const startSize = size



        const onMouseDownBottomRight = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveBottomRight)
                slideRef.current.addEventListener('mouseup', onMouseUpBottomRight)
            }
            startPosition = fromEventToLocalVec(slideRef, event)
        }

        const onMouseMoveBottomRight = (event: MouseEvent) => {
            const currentPosition = fromEventToLocalVec(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaX = currentPosition.X - startPosition.X
                const deltaY = currentPosition.Y - startPosition.Y
                newSize = { width: startSize.width + deltaX, height: startSize.height + deltaY }
                setSize(newSize)
            }
        }

        const onMouseUpBottomRight = () => {
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveBottomRight)
            }
            onChangeSize(newSize)
        }



        const onMouseDownTopLeft = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveTopLeft)
                slideRef.current.addEventListener('mouseup', onMouseUpTopLeft)
            }
            startPosition = fromEventToLocalVec(slideRef, event)
        }

        const onMouseMoveTopLeft = (event: MouseEvent) => {
            const currentPosition = fromEventToLocalVec(slideRef, event)
            if (startPosition && currentPosition && draggableObject.current) {
                const deltaX = startPosition.X - currentPosition.X
                const deltaY = startPosition.Y - currentPosition.Y
                newSize = { width: startSize.width + deltaX, height: startSize.height + deltaY }
                setSize(newSize)
                setPos(currentPosition)
            }
        }

        const onMouseUpTopLeft = (event: MouseEvent) => {
            onChangeSize(newSize)
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveTopLeft)
            }
            const newPosition = fromEventToLocalVec(slideRef, event)
            onChangePosition(newPosition)
        }



        if (draggablePointBottomRight.current &&
            draggablePointTopLeft.current
        ) {
            draggablePointBottomRight.current.addEventListener('mousedown', onMouseDownBottomRight)
            draggablePointTopLeft.current.addEventListener('mousedown', onMouseDownTopLeft)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive])
}

export {
    useResize
}

