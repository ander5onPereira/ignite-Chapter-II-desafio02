import { useField } from '@unform/core';
import React, {
  useCallback, useEffect,
  useRef,
  useState
} from 'react';
import { Container } from './styles';


interface InputProps{
  name:string,
  placeholder: string,
}

function Input({ name, placeholder,...rest }: InputProps) {
  const inputRef = useRef(null);
  
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const { fieldName, defaultValue, registerField } = useField(name);


  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.["value"]);
  }, []);


  return (
    <Container isFilled={isFilled} isFocused={isFocused}>

      <input
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  )
}

export default Input;
