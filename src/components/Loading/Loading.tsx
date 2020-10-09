import React, {FunctionComponent} from 'react';
import clsx from 'clsx';

import styles from './Loading.module.css';

interface LoadingProps {
  classes?: {
    wrapper?: string;
    loader?: string;
  };
}

const Loading: FunctionComponent<LoadingProps> = ({
  classes = {},
}: LoadingProps) => {
  return (
    <div className={clsx(styles.wrapper, classes.wrapper)}>
      <div className={clsx(styles.loader, classes.loader)} />
    </div>
  );
};

export default Loading;
