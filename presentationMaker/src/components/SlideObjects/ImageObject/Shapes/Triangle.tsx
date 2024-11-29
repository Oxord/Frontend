import { Position } from "../../../../store/types"

type TriangleProps = {
    PointOne: Position
    PointTwo: Position
    PointThree: Position
    width: number
    height: number
    color: string
}

const Triangle = ({PointOne, PointTwo, PointThree, width, height, color}: TriangleProps) => {
    const points = `${PointOne.X}, ${PointOne.Y}, ${PointTwo.X}, ${PointTwo.Y}, ${PointThree.X}, ${PointThree.Y}`
    return(
        <svg width={width} height={height} fill='none' stroke={color} strokeWidth={'3px'}> 
            <polygon x={0} y={0} points={points}/>
        </svg>
    )
} 

export{
    Triangle
}