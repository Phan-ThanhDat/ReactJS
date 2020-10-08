import * as React from 'react';
import { useState } from 'react';

import Button from '../Button/Button';
import styles from './form.module.css';

interface IFormProps {
  'on-submit': (payload: { title: string; body: string }) => void;
}

export const Form: React.FC<IFormProps> = (props) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);

  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!titleRef.current?.value) {
      setMessageTitle('Your post needs a title');
      return;
    } else if (titleRef.current?.value) {
      setMessageTitle('');
    }

    if (!bodyRef.current?.value) {
      setMessageBody('Your post needs some content');
      return;
    } else if (bodyRef.current?.value) {
      setMessageBody('');
    }

    props['on-submit']({
      title: titleRef.current?.value,
      body: bodyRef.current?.value,
    });

    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <label className={styles.label}>Post title: *</label>
      {!titleRef.current?.value && (
        <span className={styles.message}>{messageTitle}</span>
      )}
      <input
        ref={titleRef}
        placeholder='Title...'
        defaultValue=''
        className={styles.input}
      />

      <label className={styles.label}>Post content: *</label>
      {!bodyRef.current?.value && (
        <span className={styles.message}>{messageBody}</span>
      )}
      <textarea
        ref={bodyRef}
        placeholder='Start typing post content here...'
        defaultValue=''
        className={styles.textarea}
      />

      <Button>Create a post</Button>
    </form>
  );
};
