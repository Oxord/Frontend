type RectangleProps = {
    width: number
    height: number
    color: string
}

const Rectangle = ({width, height, color}: RectangleProps) => {
    return (
        <>
            <svg width={width} height={height} fill={color}> 
                <rect x={0} y={0} width={width} height={height}></rect>
            </svg>
        </>
    )
}

export {
    Rectangle
}