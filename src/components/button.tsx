import React, { AllHTMLAttributes } from 'react';

import styles from './button.module.css';

interface IButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<IButtonProps> = (props) => (
  <button className={styles.button} {...props} />
);

export default React.memo(Button);
