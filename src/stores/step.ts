import { createStore, createEvent } from 'effector';

export enum Step {
  idle,
  settings,
  result
}

export const changeStep = createEvent<Step>();
export const $step = createStore(Step.idle).on(changeStep, (_, step)=> step);
