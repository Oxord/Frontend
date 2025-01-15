import { CSSProperties, useState } from "react"
import { useAppActions } from "../../../hooks/useAppActions"

export type TextObjectProps = {
  slideId: string
  text: string
  font: string
  fontSize: number
  isReadOnly: boolean
  elemId: string
  textColor: string
  width: number
  height: number
}

export const TextObject = ({ slideId, elemId, text, font, fontSize, isReadOnly, textColor, width, height }: TextObjectProps) => {
  const textObjectStyle: CSSProperties = {
      border: 'none',
      background: 'none',
      position: 'relative',
      width: width, 
      height: height,
      //зачем тут так? потом перепроверю, как смогу дебажить
      color: textColor,
      resize: 'none',
      fontFamily: font? font: 'arial',
      fontSize: fontSize,  
      padding: '0',
      margin: '0', 
      outline: 'none', 
      overflowY: 'hidden'
  }
 
  const { changeText } = useAppActions()
  const [newText, setNewText] = useState(text)

  const onChangeText: React.ChangeEventHandler<HTMLTextAreaElement>= (event) => {
    setNewText(event.target.value)
    if (newText)
      changeText(
        slideId,
        elemId,
        newText
      )
  }
  //тут мб возникнут проблемы потом с историей, но пока пусть будет так

  return (
      <textarea 
        style={textObjectStyle} 
        readOnly={isReadOnly} 
        onChange={onChangeText}
      >
          {newText}
      </textarea>
  )
}
