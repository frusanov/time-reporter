import { createStore, createEvent } from 'effector';
import * as Papa from 'papaparse';
import { round } from '../utils/round';
import { $settings } from './settings';

export interface ResultItem {
  time: number;
  description: string;
}

export type ResultData = Record<string, ResultItem>

export const changeFile = createEvent<File>();
export const parseFile = createEvent();
export const $file = createStore<File | null>(null)
  .on(changeFile, (_, file) => file)
  .on(parseFile, ()=> {
    const file = $file.getState()! as File;
    parse(file);
    return file;
  });

export const changeTotalHours = createEvent<number>();
export const $totalHours = createStore<number>(0).on(changeTotalHours, (_, hours) => hours);

export const changeParsedFile = createEvent<ResultData>();
export const $parsedFile = createStore<ResultData>({}).on(changeParsedFile, (_, file) => file);

function parse(file: File) {
  let total = 0;
  const data: ResultData = {};

  Papa.parse(file, {
    header: true,
    complete: (result) => {
      result.data.forEach((row: any) => {
        const issue = row['Issue Key'];
        const time = round(parseFloat(row['Time Spent (h)']), $settings.getState().precision);
        const description = row['Issue Summary'] ?? '';

        if (!issue || !time) return;

        total = total + time;

        if (data[issue]) {
          data[issue].time = data[issue].time + time;
        } else {
          data[issue] = {
            time,
            description
          };
        }
      });
      
      changeParsedFile(data);
      changeTotalHours(total);
      // changeStep(Step.settings);
    }
  });
}
