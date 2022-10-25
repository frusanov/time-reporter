import { Component, createMemo, createSignal } from "solid-js";
import { v4 as uuidv4 } from 'uuid';
import { Select as SolidSelect } from "@thisbeyond/solid-select";
import './Select.scss';

export interface SelectProps {
  label?: string;
  options: Array<string>;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Select: Component<SelectProps> = (props) => {
  const id = createMemo(() => uuidv4());
  const handleChange = (value: string) => {
    if (props.onChange) props.onChange(value);
  };
  const [focus, setFocus] = createSignal();

  return <>
    { props.label && <label for={id()} class={'solid-select-label'}>{ props.label }</label> }
    <SolidSelect
      id={id()}
      class={focus() ? 'focused' : ''}
      initialValue={props.defaultValue}
      options={props.options}
      onChange={handleChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  </>;
};

export default Select;