import * as React from 'react';

import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { Button } from './button';
import styles from './post.module.css';

// removed unused old-Post component ( in the bottom )
// moved used-Post component from feed (List-Post) component to here
// refactor component like interface...
// accessibility = replace div with role=button with Button component

export interface IPost {
  index: number;
  post: {
    title: string;
    body: string;
    likesCount: number;
    isLiked: boolean;
  };
  onLike: (index: number) => void;
}

export const Post: React.FC<IPost> = ({ index, post, onLike }) => {
  return (
    <div className={styles.post}>
      <p className={styles.postTitle}>{post.title}</p>

      <p className={styles.postBody}>{post.body}</p>

      <div className={styles.stats}>
        {!!post.likesCount && (
          <div className={styles.statsItem}>
            <FaThumbsUp /> <span>{post.likesCount}</span>
          </div>
        )}
      </div>

      <div className={styles.actionBar}>
        <Button
          className={`${styles.actionBarItem} ${post.isLiked ? 'active' : ''}`}
          onClick={() => {
            onLike(index);
          }}
        >
          <FaThumbsUp /> <span className={styles.actionBarItemLabel}>Like</span>
        </Button>

        <Button className={styles.actionBarItem} role='button'>
          <FaComment />{' '}
          <span className={styles.actionBarItemLabel}>Comment</span>
        </Button>
      </div>
    </div>
  );
};

// interface IPost {
//   title: string;
//   body: string;
// }

// export const Post: React.FC<IPost> = ({ title, body }) => (
//   <div className={styles.post}>
//     <p className={styles.postTitle}>{title}</p>

//     <p className={styles.postBody}>{body}</p>
//   </div>
// );
