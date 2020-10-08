import * as React from 'react';

import styles from './button.module.css';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IButtonProps> = (props) => {
  return <button className={styles.button} {...props} />;
};

export default React.memo(Button);
