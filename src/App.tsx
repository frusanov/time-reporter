import { Component } from 'solid-js';
import styles from './styles/App.module.scss';
import DropFile from './views/DropFile';
import Result from './views/Result';
import Settings from './views/Settings';
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
