import { Component, createSignal } from 'solid-js';
import styles from './App.module.css';
import DropFile from './components/DropFile';
import * as Papa from 'papaparse';
import Result from './components/Result';
import Settings from './components/Settings';
import { useUnit } from 'effector-solid';
import { $step, Step } from './stores/step';



const App: Component = () => {
  const step = useUnit($step);

  return (
    <div class={styles.App}>
      <main class={styles.main}>
        {step() === Step.idle && 
         <DropFile />
        }
        {step() === Step.settings && 
         <Settings />
        }
        {step() === Step.result && 
         <Result />
        }
      </main>
    </div>
  );
};

export default App;
