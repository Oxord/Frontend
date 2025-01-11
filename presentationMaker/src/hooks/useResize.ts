import { RefObject, useEffect } from "react"
import { fromEventToCoordinate } from "../store/fromEventToCoordinate"
import { Position, SizeType } from "../store/types"
const useResize = (
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
    isPointActive: boolean
) => {
    useEffect(() => {

        let fixedXCoord: number | undefined
        let fixedYCoord: number | undefined

        let startPosition: Position | undefined = { X: 0, Y: 0 }
        let newSize: SizeType = { width: 0, height: 0 }
        const startSize = size


        const onMouseDownBottomRight = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveBottomRight)
                slideRef.current.addEventListener('mouseup', onMouseUpBottomRight)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
        }

        const onMouseMoveBottomRight = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
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
                slideRef.current.removeEventListener('mouseup', onMouseUpBottomRight)
            }
            onChangeSize(newSize)
        }



        const onMouseDownBottom = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveBottom)
                slideRef.current.addEventListener('mouseup', onMouseUpBottom)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
        }

        const onMouseMoveBottom = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaY = currentPosition.Y - startPosition.Y
                newSize = { width: startSize.width, height: startSize.height + deltaY }
                setSize(newSize)
            }
        }

        const onMouseUpBottom = () => {
            onChangeSize(newSize)
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveBottom)
                slideRef.current.removeEventListener('mouseup', onMouseUpBottom)
            }
        }



        const onMouseDownBottomLeft = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveBottomLeft)
                slideRef.current.addEventListener('mouseup', onMouseUpBottomLeft)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
        }

        const onMouseMoveBottomLeft = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaX = startPosition.X - currentPosition.X
                const deltaY = currentPosition.Y - startPosition.Y
                newSize = { width: startSize.width + deltaX, height: startSize.height + deltaY }
                setSize(newSize)
                setPos({ X: currentPosition.X, Y: currentPosition.Y - newSize.height })
            }
        }

        const onMouseUpBottomLeft = (event: MouseEvent) => {
            onChangeSize(newSize)
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveBottomLeft)
                slideRef.current.removeEventListener('mouseup', onMouseUpBottomLeft)
            }
            const newPosition = fromEventToCoordinate(slideRef, event)
            if (newPosition) {
                onChangePosition({ X: newPosition.X, Y: newPosition.Y - newSize.height })
            }

        }



        const onMouseDownMediumLeft = (event: MouseEvent) => {
            if (slideRef.current && draggablePointMediumLeft.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveMediumLeft)
                slideRef.current.addEventListener('mouseup', onMouseUpMediumLeft)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            fixedYCoord = startPosition?.Y
        }

        const onMouseMoveMediumLeft = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaX = startPosition.X - currentPosition.X
                newSize = { width: startSize.width + deltaX, height: startSize.height }
                setSize(newSize)
                if (fixedYCoord) {
                    setPos({ X: currentPosition.X, Y: fixedYCoord - newSize.height / 2})
                }

            }
        }

        const onMouseUpMediumLeft = (event: MouseEvent) => {
            onChangeSize(newSize)
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveMediumLeft)
                slideRef.current.removeEventListener('mouseup', onMouseUpMediumLeft)
            }
            const newPosition = fromEventToCoordinate(slideRef, event)
            if (newPosition && fixedYCoord) {
                onChangePosition({ X: newPosition.X, Y: fixedYCoord - newSize.height / 2})
            }

        }



        const onMouseDownMediumRight = (event: MouseEvent) => {
            if (slideRef.current && draggablePointMediumLeft.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveMediumRight)
                slideRef.current.addEventListener('mouseup', onMouseUpMediumRight)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
        }

        const onMouseMoveMediumRight = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaX = currentPosition.X - startPosition.X
                newSize = { width: startSize.width + deltaX, height: startSize.height }
                setSize(newSize)
            }
        }

        const onMouseUpMediumRight = () => {
            onChangeSize(newSize)
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveMediumRight)
                slideRef.current.removeEventListener('mouseup', onMouseUpMediumRight)
            }

        }



        const onMouseDownTopRight = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveTopRight)
                slideRef.current.addEventListener('mouseup', onMouseUpTopRight)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
        }

        const onMouseMoveTopRight = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaX = currentPosition.X - startPosition.X
                const deltaY = startPosition.Y - currentPosition.Y
                newSize = { width: startSize.width + deltaX, height: startSize.height + deltaY }
                setSize(newSize)
                setPos({ X: currentPosition.X - newSize.width, Y: currentPosition.Y })
            }
        }

        const onMouseUpTopRight = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveTopRight)
                slideRef.current.removeEventListener('mouseup', onMouseUpTopRight)
            }
            onChangeSize(newSize)
            const newPosition = fromEventToCoordinate(slideRef, event)
            if (newPosition) {
                onChangePosition({ X: newPosition.X - newSize.width, Y: newPosition.Y })
            }
        }



        const onMouseDownTop = (event: MouseEvent) => {
            if (slideRef.current && draggablePointTop.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveTop)
                slideRef.current.addEventListener('mouseup', onMouseUpTop)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            fixedXCoord = startPosition?.X
        }

        const onMouseMoveTop = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaY = startPosition.Y - currentPosition.Y
                newSize = { width: startSize.width, height: startSize.height + deltaY }
                setSize(newSize)
                if (fixedXCoord) {
                    setPos({ X: fixedXCoord - newSize.width / 2, Y: currentPosition.Y })
                }
            }
        }

        const onMouseUpTop = (event: MouseEvent) => {
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveTop)
                slideRef.current.removeEventListener('mouseup', onMouseUpTop)
            }
            onChangeSize(newSize)
            const newPosition = fromEventToCoordinate(slideRef, event)
            if (newPosition && fixedXCoord) {
                onChangePosition({ X: newPosition.X - newSize.width / 2, Y: newPosition.Y })
            }
        }



        const onMouseDownTopLeft = (event: MouseEvent) => {
            if (slideRef.current && draggablePointTopLeft.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveTopLeft)
                slideRef.current.addEventListener('mouseup', onMouseUpTopLeft)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
        }

        const onMouseMoveTopLeft = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
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
                slideRef.current.removeEventListener('mouseup', onMouseUpTopLeft)
            }
            const newPosition = fromEventToCoordinate(slideRef, event)
            onChangePosition(newPosition)
        }



        if (draggablePointBottomRight.current &&
            draggablePointBottom.current &&
            draggablePointBottomLeft.current &&
            draggablePointMediumRight.current &&
            draggablePointMediumLeft.current &&
            draggablePointTopRight.current &&
            draggablePointTop.current &&
            draggablePointTopLeft.current

        ) {
            draggablePointBottomRight.current.addEventListener('mousedown', onMouseDownBottomRight)
            draggablePointBottom.current.addEventListener('mousedown', onMouseDownBottom)
            draggablePointBottomLeft.current.addEventListener('mousedown', onMouseDownBottomLeft)
            draggablePointMediumLeft.current.addEventListener('mousedown', onMouseDownMediumLeft)
            draggablePointMediumRight.current.addEventListener('mousedown', onMouseDownMediumRight)
            draggablePointTopRight.current.addEventListener('mousedown', onMouseDownTopRight)
            draggablePointTop.current.addEventListener('mousedown', onMouseDownTop)
            draggablePointTopLeft.current.addEventListener('mousedown', onMouseDownTopLeft)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPointActive])
}

export {
    useResize
}

