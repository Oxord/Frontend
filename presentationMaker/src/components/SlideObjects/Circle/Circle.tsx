export type CircleProps = {
  radius: number
}

export const Circle = ({ radius }: CircleProps) => {
    return (
        <div style={{ borderRadius: radius }}></div>
  )
}
