import * as React from 'react';
import styles from './button.module.css';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<IButtonProps> = (props) => (
  <button className={styles.button} {...props} />
);
