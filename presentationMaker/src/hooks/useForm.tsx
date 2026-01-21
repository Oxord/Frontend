import React, { useState } from "react";

export const useForm = () => {

  const [formValue, setFormValue] = useState('')
  
  const onFormValueChange = (e: React.FormEvent) => {
    setFormValue( (e.target as HTMLInputElement).value )
  }

  console.log('src: ', formValue)
  return {
    formValue, onFormValueChange
  }
}

