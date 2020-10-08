import * as React from 'react';

import styles from './post.module.css';

interface IPost {
  title: string;
  body: string;
}

export const Post: React.FC<IPost> = ({ title, body }) => (
  <div className={styles.post}>
    <p className={styles.postTitle}>{title}</p>

    <p className={styles.postBody}>{body}</p>
  </div>
);
