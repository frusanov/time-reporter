import { Component, createSignal } from 'solid-js';
import Button from './Button';
import styles from './Settings.module.scss';
import { useUnit } from 'effector-solid';
import { $settings, changeSettings } from '../stores/settings';
import { changeStep, Step } from '../stores/step';

const HOUR_PRICE = 'hourPrice';

const Settings: Component = () => {
  const settings = useUnit($settings);
  
  const [hourPrice, setHourPrice] = createSignal(settings().hourPrice);  

  const handleSave = () => {
    changeSettings({
      hourPrice: hourPrice()
    });
    changeStep(Step.result);
  };

  return (
    <div class={styles.Settings}>
      <label for={HOUR_PRICE}>Стоимость часа</label>
      <input id={HOUR_PRICE} type={'number'} value={hourPrice()} onInput={(e)=> setHourPrice(parseInt(e.currentTarget.value))}  />
      <Button onClick={handleSave}>Сохранить и продолжить</Button>
    </div>
  );
};

export default Settings;

