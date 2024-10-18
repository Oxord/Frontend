type CitcleProps = {
    radius: number
}

const Circle = ({radius}: CitcleProps) => {
    return(
        <svg radius={radius}>
            <circle></circle>
        </svg>
    )
}

export{
    Circle
}