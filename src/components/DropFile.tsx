import { Component, createEffect, createSignal, onCleanup } from 'solid-js';
import { changeFile } from '../stores/file';
import { changeStep, Step } from '../stores/step';
import styles from './DropFile.module.scss';

const DropFile: Component = () => {
  const [dragover, setDragover] = createSignal(false);

  let fileInput: HTMLInputElement;

  const handleAddedFiles = (files?: FileList) => {
    if (!files?.length) return;
    if (files.length > 1) return;

    const file = files[0];

    if (file.type !== 'text/csv') return;

    changeFile(file);
    changeStep(Step.settings);
  };

  const onInput = (e: InputEvent) => {
    handleAddedFiles(e.target?.files);
  };

  const setTragoverTrue = (e: DragEvent) => {
    e.preventDefault();
    setDragover(true);
  };

  const setTragoverFalse = (e: DragEvent) => {
    e.preventDefault();
    setDragover(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragover(false);

    handleAddedFiles(e.dataTransfer?.files);
  };

  createEffect(()=> {
    document.body.addEventListener('dragover', setTragoverTrue);
    document.body.addEventListener('dragleave', setTragoverFalse);
    document.body.addEventListener('drop', onDrop);

    onCleanup(() => {
      document.body.removeEventListener('dragleave', onDrop);
      document.body.removeEventListener('dragover', setTragoverTrue);
      document.body.removeEventListener('drop', onDrop);
    });    
  });

  return (
    <div
      id={'dropzone'}
      classList={{[styles.dropfile]: true, [styles.dragover]: dragover()}}
      onClick={() => fileInput.click()}
    >
      <input type={'file'} class={styles.input} ref={fileInput} onInput={onInput} />
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
      </svg>
    </div>
  );
};

export default DropFile;
