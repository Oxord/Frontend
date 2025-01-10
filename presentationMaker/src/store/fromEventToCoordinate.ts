import { RefObject } from "react"
import { Position } from "./types"

type EventType = {
    clientX: number,
    clientY: number
}

function fromEventToCoordinate(ref: RefObject<HTMLElement>, event: EventType): Position | undefined {
    if (ref.current) {
        const { left, top } = ref.current.getBoundingClientRect()
        return {
            X: event.clientX - left,
            Y: event.clientY - top
        }
    }

}

export {
    fromEventToCoordinate
}
