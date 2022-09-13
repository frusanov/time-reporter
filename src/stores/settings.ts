import { createStore, createEvent } from 'effector';

export interface Settings {
  hourPrice: number;
} 

export const SETTINGS = 'settings';

const defaultSettings: Settings = {
  hourPrice: 1000
};

const storeSettings = (settings: Partial<Settings>) => {
  localStorage.setItem(SETTINGS, JSON.stringify({...defaultSettings, ...settings}));
};
const restoreSettings = (): Settings => {
  const restored = JSON.parse(localStorage.getItem(SETTINGS) || '{}');
    return {...defaultSettings, ...restored}; 
};

export const changeSettings = createEvent<Settings>();
export const $settings = createStore(restoreSettings()).on(changeSettings, (previousSettings, currentSettings) => {
  const settings = {...previousSettings, ...currentSettings};
  storeSettings(settings);
  return settings; 
});
