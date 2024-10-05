export type TextObjectProps = {
  text: string
  font: string
  fontSize: number
};

export const TextObject = ({ text, font, fontSize }: TextObjectProps) => {
  return (
      <p style={{ font: font, fontSize: fontSize }}>{text}</p>
  )
}
