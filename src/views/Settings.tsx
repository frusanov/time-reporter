import { Component, createSignal } from 'solid-js';
import Button from '../components/Button';
import styles from './Settings.module.scss';
import { useUnit } from 'effector-solid';
import { $settings, changeSettings } from '../stores/settings';
import { changeStep, Step } from '../stores/step';
import Input from '../components/Input';

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
      <Input
        label={'Стоимость часа'}
        type={'number'}
        defaultValue={hourPrice().toString()}
        onChange={setHourPrice}
      />
      <Button onClick={handleSave}>Сохранить и продолжить</Button>
    </div>
  );
};

export default Settings;

