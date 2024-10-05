export type RectangleProps = {
    length: number
    height: number
}
  
export const Rectangle = ({ length, height }: RectangleProps) => {
    return (
        <div style={{width: length, height: height} }></div>
    )
}