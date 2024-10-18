import { Position } from "../../../store/types"

type TriangleProps = {
    PointOne: Position
    PointTwo: Position
    PointThree: Position
}

const Triangle = ({PointOne, PointTwo, PointThree}: TriangleProps) => {
    return(
        <svg>
            <polygon points={ PointOne.X.toString() + 
                PointOne.Y.toString() + 
                PointTwo.X.toString() + 
                PointTwo.Y.toString() + 
                PointThree.X.toString() + 
                PointThree.Y.toString()
            }>
            </polygon>
        </svg>
    )
} 

export{
    Triangle
}