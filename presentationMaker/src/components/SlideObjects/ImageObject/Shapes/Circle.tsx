type CitcleProps = {
    radius: number
    color: string
}

const Circle = ({radius, color}: CitcleProps) => {
    return(
        <svg width={radius * 2} height={radius * 2} fill={color}>
            <circle cx={radius} cy={radius} r={radius}/>
        </svg> 
    )
}

export{
    Circle
}