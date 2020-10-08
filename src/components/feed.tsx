import * as React from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';

import styles from './feed.module.css';

interface IFeedProps {
  posts: any;
  onLike: (index: number) => void;
}

export default function Feed(props: IFeedProps) {
  var posts = [];

  for (const [index, post] of props.posts.entries()) {
    posts.push(
      <Post key={index} index={index} post={post} onLike={props.onLike} />
    );
  }

  return <div>{posts}</div>;
}

export const Post: React.FC<{
  index: number;
  post: {
    title: string;
    body: string;
    likesCount: number;
    isLiked: boolean;
  };
  onLike: (index: number) => void;
}> = ({ index, post, onLike }) => {
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
        <div
          className={`${styles.actionBarItem} ${post.isLiked ? 'active' : ''}`}
          role='button'
          onClick={() => {
            onLike(index);
          }}
        >
          <FaThumbsUp /> <span className={styles.actionBarItemLabel}>Like</span>
        </div>

        <div className={styles.actionBarItem} role='button'>
          <FaComment />{' '}
          <span className={styles.actionBarItemLabel}>Comment</span>
        </div>
      </div>
    </div>
  );
};
