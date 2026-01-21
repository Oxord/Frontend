import { CSSProperties, useEffect, useState } from "react"
import { useAppActions } from "../../../hooks/useAppActions"
import { TextAlign } from "../../../store/types"

export type TextObjectProps = {
  slideId: string
  text: string
  font: string
  fontSize: number
  isReadOnly: boolean
  elemId: string
  textColor: string
  width: number
  height: number,
  align: TextAlign
}

export const TextObject = ({ slideId, elemId, text, font, fontSize, isReadOnly, textColor, width, height, align }: TextObjectProps) => {
  const textObjectStyle: CSSProperties = {
      border: 'none',
      background: 'none',
      position: 'relative',
      width: width, 
      height: height,
      color: textColor,
      resize: 'none',
      fontFamily: font? font: 'arial',
      fontSize: fontSize, 
      textAlign: align, 
      padding: '0',
      margin: '0', 
      outline: 'none', 
      overflowY: 'hidden'
  }
 
  const { changeText } = useAppActions()
  const [newText, setNewText] = useState(text)

  useEffect(() => {
    setNewText(text)
  }, [text]);

  const onChangeText: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setNewText(event.target.value)
  }

  const onBlurText = () => {
    if (newText !== text) {
      changeText(slideId, elemId, newText)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  }

  const handleMouseDown = (e: React.MouseEvent) => {
      if (!isReadOnly) {
        e.stopPropagation();
      }
  }

  return (
      <textarea 
        style={textObjectStyle} 
        readOnly={isReadOnly}
        onBlur={onBlurText}
        onChange={onChangeText}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        value={newText}
      >
      </textarea>
  )
}
