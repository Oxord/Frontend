import { CSSProperties, useState } from "react"
import { dispatch } from "../../../store/editor"
import { changeText } from "../../../store/Actions/changeText"

export type TextObjectProps = {
  text: string
  font: string
  fontSize: number
  isReadOnly: boolean
  elemId: string
  //добавить цвет текста
}

export const TextObject = ({ text, font, fontSize, isReadOnly, elemId }: TextObjectProps) => {
  const textObjectStyle: CSSProperties = {
      border: 'none',
      background: 'none',
      position: 'relative',
      width: '100%', 
      height: 'auto',
      maxHeight: '200px', 
      resize: 'none',
      fontFamily: font? font: 'arial',
      fontSize: fontSize,  
      padding: '0',
      margin: '0', 
      outline: 'none', 
      overflowY: 'hidden'
  }
  // const fontContext = React.createContext(font) 

  const [textAreaValue, setTextAreaValue] = useState(text)
  const changeTextAreaValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextAreaValue(event.target.value)
    const obj = {
      slideId: '361a7d46-e882-4d8d-9353-66d90c57d157',
      textObjtId: elemId,
      newText: textAreaValue
    }
    dispatch(changeText, obj)
  }

  // if (!textAreaValue){
    
  // }

  return (
      <textarea style={textObjectStyle} readOnly={isReadOnly} onChange={changeTextAreaValue}>{textAreaValue}</textarea>
  )
}
