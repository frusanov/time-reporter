import { Component, createMemo, createSignal, JSX } from "solid-js";
import styles from './Input.module.scss';
import { v4 as uuidv4 } from 'uuid';

 interface NumberInputProps {
  type: 'number'
  onChange?: (value: number) => void
}

 interface TextInputProps {
  type: 'text' | undefined;
  onChange?: (value: string) => void
}

export type InputProps = (NumberInputProps | TextInputProps) & {
  label?: string
  defaultValue?: string
}

const Input: Component<InputProps> = (props) => {
  const id = createMemo(() => uuidv4());
  const [value, setValue] = createSignal(props.defaultValue ?? '');

  const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (e) => {
    const value = e.currentTarget.value;

    setValue(value);

    if (props.onChange) {
      if (props.type === 'number') props.onChange(parseFloat(value));
      else props.onChange(value);
    }
  };

  return <>
    { props.label && <label for={id()} class={styles.Label}>{ props.label }</label> }
    <input
      id={id()}
      class={styles.Input}
      type={props.type || 'text'}
      value={value()}
      onInput={handleInput}
    />
  </>;
};

export default Input;