type RectangleProps = {
    width: number
    height: number
}

const Rectangle = ({width, height}: RectangleProps) => {
    return (
        <svg width={width} height={height}>
            <rect></rect>
        </svg>
    )
}

export {
    Rectangle
}