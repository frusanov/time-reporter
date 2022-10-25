import { Component, createSignal } from 'solid-js';
import Button from '../components/Button';
import styles from './Settings.module.scss';
import { useUnit } from 'effector-solid';
import { $settings, changeSettings } from '../stores/settings';
import { changeStep, Step } from '../stores/step';
import Input from '../components/Input';
import Select from '../components/Select';
import { parseFile } from '../stores/file';

const Settings: Component = () => {
  const settings = useUnit($settings);
  
  const [hourPrice, setHourPrice] = createSignal(settings().hourPrice);  
  const [precision, setPrecision] = createSignal(settings().precision);  

  const handleSave = () => {
    changeSettings({
      hourPrice: hourPrice(),
      precision: precision(),
    });
    parseFile();
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
      <Select
        label={'Округление времени'}
        options={['0.01', '0.05', '0.1', '0.5', '1']}
        defaultValue={precision().toString()}
        onChange={(value) => setPrecision(parseFloat(value))}
      />
      <Button onClick={handleSave}>Сохранить и продолжить</Button>
    </div>
  );
};

export default Settings;

