export type ImageObjectProps = {
    src: string
    width: number
    height: number
}

export const ImageObject = ({src, width, height}: ImageObjectProps) => {
  return (
        <img
            src={src}
            style={{ width: width, height: height }}>
        </img>
  )
}
