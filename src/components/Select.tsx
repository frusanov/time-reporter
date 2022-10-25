import { Component, ComponentProps } from "solid-js";
import styles from './Button.module.scss';

const Select: Component<ComponentProps<'button'>> = (props) => {
  return <button class={styles.Button} {...props}>{props.children}</button>;
};

export default Select;