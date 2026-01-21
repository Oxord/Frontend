import { RefObject, useEffect, useRef } from "react"
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
    const sizeRef = useRef(size)
    useEffect(() => {
        sizeRef.current = size
    }, [size])

    useEffect(() => {
        
        let startPosition: Position | undefined = { X: 0, Y: 0 }
        let startSize: SizeType = { width: 0, height: 0 }
        let newSize: SizeType = { width: 0, height: 0 }
        
        let fixedXCoord: number | undefined
        let fixedYCoord: number | undefined

        //BOTTOM RIGHT
        const onMouseDownBottomRight = (event: MouseEvent) => {
            event.stopPropagation() 
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveBottomRight)
                slideRef.current.addEventListener('mouseup', onMouseUpBottomRight)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            startSize = { ...sizeRef.current }
            newSize = { ...startSize }
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
            onChangeSize(newSize)
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveBottomRight)
                slideRef.current.removeEventListener('mouseup', onMouseUpBottomRight)
            }
        }

        //BOTTOM
        const onMouseDownBottom = (event: MouseEvent) => {
            event.stopPropagation()
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveBottom)
                slideRef.current.addEventListener('mouseup', onMouseUpBottom)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            startSize = { ...sizeRef.current }
            newSize = { ...startSize }
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

        //BOTTOM LEFT
        const onMouseDownBottomLeft = (event: MouseEvent) => {
            event.stopPropagation()
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveBottomLeft)
                slideRef.current.addEventListener('mouseup', onMouseUpBottomLeft)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            startSize = { ...sizeRef.current }
            newSize = { ...startSize }
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
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (currentPosition) {
                onChangePosition({ X: currentPosition.X, Y: currentPosition.Y - newSize.height })
            }

            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveBottomLeft)
                slideRef.current.removeEventListener('mouseup', onMouseUpBottomLeft)
            }
        }

        //MEDIUM LEFT
        const onMouseDownMediumLeft = (event: MouseEvent) => {
            event.stopPropagation()
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveMediumLeft)
                slideRef.current.addEventListener('mouseup', onMouseUpMediumLeft)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            startSize = { ...sizeRef.current }
            fixedYCoord = startPosition?.Y
            newSize = { ...startSize }
        }

        const onMouseMoveMediumLeft = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaX = startPosition.X - currentPosition.X
                newSize = { width: startSize.width + deltaX, height: startSize.height }
                setSize(newSize)
                if (fixedYCoord !== undefined) {
                    setPos({ X: currentPosition.X, Y: fixedYCoord - newSize.height / 2 })
                }
                setPos((prevPos: Position) => ({ X: currentPosition.X, Y: prevPos.Y }))
            }
        }

        const onMouseUpMediumLeft = (event: MouseEvent) => {
            onChangeSize(newSize)
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (currentPosition) {
                 onChangePosition((prev: Position) => ({ X: currentPosition.X, Y: prev.Y }))
            }

            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveMediumLeft)
                slideRef.current.removeEventListener('mouseup', onMouseUpMediumLeft)
            }
        }

        //MEDIUM RIGHT
        const onMouseDownMediumRight = (event: MouseEvent) => {
            event.stopPropagation()
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveMediumRight)
                slideRef.current.addEventListener('mouseup', onMouseUpMediumRight)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            startSize = { ...sizeRef.current }
            newSize = { ...startSize }
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

        //TOP RIGHT
        const onMouseDownTopRight = (event: MouseEvent) => {
            event.stopPropagation()
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveTopRight)
                slideRef.current.addEventListener('mouseup', onMouseUpTopRight)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            startSize = { ...sizeRef.current }
            newSize = { ...startSize }
        }

        const onMouseMoveTopRight = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaX = currentPosition.X - startPosition.X
                const deltaY = startPosition.Y - currentPosition.Y
                newSize = { width: startSize.width + deltaX, height: startSize.height + deltaY }
                setSize(newSize)
                setPos((prev: Position) => ({ X: prev.X, Y: currentPosition.Y }))
            }
        }

        const onMouseUpTopRight = (event: MouseEvent) => {
            onChangeSize(newSize)
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (currentPosition) {
                onChangePosition((prev: Position) => ({ X: prev.X, Y: currentPosition.Y }))
            }
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveTopRight)
                slideRef.current.removeEventListener('mouseup', onMouseUpTopRight)
            }
        }

        //TOP 
        const onMouseDownTop = (event: MouseEvent) => {
            event.stopPropagation()
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveTop)
                slideRef.current.addEventListener('mouseup', onMouseUpTop)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            startSize = { ...sizeRef.current }
            fixedXCoord = startPosition?.X
            newSize = { ...startSize }
        }

        const onMouseMoveTop = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaY = startPosition.Y - currentPosition.Y
                newSize = { width: startSize.width, height: startSize.height + deltaY }
                setSize(newSize)
                setPos((prev: Position) => ({ X: prev.X, Y: currentPosition.Y }))
            }
        }

        const onMouseUpTop = (event: MouseEvent) => {
            onChangeSize(newSize)
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (currentPosition) {
                onChangePosition((prev: Position) => ({ X: prev.X, Y: currentPosition.Y }))
            }
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveTop)
                slideRef.current.removeEventListener('mouseup', onMouseUpTop)
            }
        }

        //TOP LEFT
        const onMouseDownTopLeft = (event: MouseEvent) => {
            event.stopPropagation()
            if (slideRef.current) {
                slideRef.current.addEventListener('mousemove', onMouseMoveTopLeft)
                slideRef.current.addEventListener('mouseup', onMouseUpTopLeft)
            }
            startPosition = fromEventToCoordinate(slideRef, event)
            startSize = { ...sizeRef.current }
            newSize = { ...startSize }
        }

        const onMouseMoveTopLeft = (event: MouseEvent) => {
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (startPosition && currentPosition) {
                const deltaX = startPosition.X - currentPosition.X
                const deltaY = startPosition.Y - currentPosition.Y
                newSize = { width: startSize.width + deltaX, height: startSize.height + deltaY }
                setSize(newSize)
                setPos({ X: currentPosition.X, Y: currentPosition.Y })
            }
        }

        const onMouseUpTopLeft = (event: MouseEvent) => {
            onChangeSize(newSize)
            const currentPosition = fromEventToCoordinate(slideRef, event)
            if (currentPosition) {
                onChangePosition({ X: currentPosition.X, Y: currentPosition.Y })
            }
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveTopLeft)
                slideRef.current.removeEventListener('mouseup', onMouseUpTopLeft)
            }
        }

        const points = [
            { ref: draggablePointBottomRight, handler: onMouseDownBottomRight },
            { ref: draggablePointBottom, handler: onMouseDownBottom },
            { ref: draggablePointBottomLeft, handler: onMouseDownBottomLeft },
            { ref: draggablePointMediumLeft, handler: onMouseDownMediumLeft },
            { ref: draggablePointMediumRight, handler: onMouseDownMediumRight },
            { ref: draggablePointTopRight, handler: onMouseDownTopRight },
            { ref: draggablePointTop, handler: onMouseDownTop },
            { ref: draggablePointTopLeft, handler: onMouseDownTopLeft },
        ]

        points.forEach(({ ref, handler }) => {
            if (ref.current) ref.current.addEventListener('mousedown', handler)
        })

        // Cleanup функция
        return () => {
            points.forEach(({ ref, handler }) => {
                if (ref.current) ref.current.removeEventListener('mousedown', handler)
            })
            if (slideRef.current) {
                slideRef.current.removeEventListener('mousemove', onMouseMoveBottomRight)
                slideRef.current.removeEventListener('mouseup', onMouseUpBottomRight)
                slideRef.current.removeEventListener('mousemove', onMouseMoveBottom)
                slideRef.current.removeEventListener('mouseup', onMouseUpBottom)
                slideRef.current.removeEventListener('mousemove', onMouseMoveBottomLeft)
                slideRef.current.removeEventListener('mouseup', onMouseUpBottomLeft)
                slideRef.current.removeEventListener('mousemove', onMouseMoveMediumLeft)
                slideRef.current.removeEventListener('mouseup', onMouseUpMediumLeft)
                slideRef.current.removeEventListener('mousemove', onMouseMoveMediumRight)
                slideRef.current.removeEventListener('mouseup', onMouseUpMediumRight)
                slideRef.current.removeEventListener('mousemove', onMouseMoveTopRight)
                slideRef.current.removeEventListener('mouseup', onMouseUpTopRight)
                slideRef.current.removeEventListener('mousemove', onMouseMoveTop)
                slideRef.current.removeEventListener('mouseup', onMouseUpTop)
                slideRef.current.removeEventListener('mousemove', onMouseMoveTopLeft)
                slideRef.current.removeEventListener('mouseup', onMouseUpTopLeft)
            }
        }

    }, [isPointActive])
}

export { useResize }