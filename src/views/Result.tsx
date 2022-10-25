import { Component, For } from 'solid-js';
import { useUnit } from 'effector-solid';
import copy from 'copy-rich-text';
import Button from '../components/Button';
import styles from './Result.module.scss';
import { $parsedFile, $totalHours } from '../stores/file';
import { $settings } from '../stores/settings';
import { changeStep, Step } from '../stores/step';

const Result: Component = () => {
  let table: any;

  const {
    parsedFile,
    totalHours
  } = useUnit({
    parsedFile: $parsedFile,
    totalHours: $totalHours
  });
  const settings = useUnit($settings);
  const { hourPrice } = settings();

  const handleCopy = async () => {
    await copy(table);
  };

  return (
    <div class={styles.result}>
      <div class={styles.Actions}>
        <Button onClick={() => changeStep(Step.idle)}>В начало</Button>
        <Button onClick={handleCopy}>Копировать содержимое</Button>
      </div>
      <table class={styles.table} ref={table}>
        <thead>
          <tr>
            <td> Код задачи </td>
            <td class={styles.center}> Наименование задач </td>
            <td class={styles.center}> Затрачено времени (часов) </td>
            <td class={styles.center}> Ставка (рублей) </td>
          </tr>
        </thead>
        <tbody>
          <For each={Object.keys(parsedFile())}>{(key) => {
              const row = parsedFile()[key];

              return (
                <tr>
                  <td>
                    {key}
                  </td>
                  <td>
                    {row.description}
                  </td>
                  <td class={styles.center}>
                    {row.time}
                  </td>
                  <td class={styles.center}>
                    {hourPrice}
                  </td>
                </tr>
              );
            }}
          </For>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>ИТОГО:</td>
            <td class={styles.center}>{totalHours()}</td>
            <td class={styles.center}>{totalHours() * hourPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Result;
