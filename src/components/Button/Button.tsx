import React from 'react';

import { IButtonProps } from '../../types';
import styles from './Button.module.css';

const Button: React.FC<IButtonProps> = (props) => (
  <button className={styles.button} {...props} />
);

export default React.memo(Button);
