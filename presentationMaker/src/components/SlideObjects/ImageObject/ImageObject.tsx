export type ImageObjectProps = {
    src: string
    width: number
    height: number
}

export const ImageObject = ({src, width, height}: ImageObjectProps) => {
  return (
        <img
            src={src}
            style={{ maxWidth: width, maxHeight: height }}>
        </img>
  )
}
