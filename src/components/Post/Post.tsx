import * as React from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';

import { IPost } from '../../types';
import Button from '../Button/Button';
import TransitionsModal from '../Modal';
import styles from './Post.module.css';

// removed unused old-Post component ( in the bottom )
// moved used-Post component from feed (List-Post) component to here
// refactor component like interface...
// accessibility = replace div with role=button with Button component

const Post: React.FC<IPost> = ({ index, post, onLike, cmts }) => {
  const [isOpenCmt, setIsOpenCmt] = React.useState<boolean>(false);
  const handleLike = () => {
    onLike(index);
  };

  const handleCmt = () => {
    setIsOpenCmt(!isOpenCmt);
  };

  const handleOpenModalClosedParent = (isModalClosed: boolean) => {
    setIsOpenCmt(isModalClosed);
  };

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
          onClick={handleLike}
        >
          <FaThumbsUp /> <span className={styles.actionBarItemLabel}>Like</span>
        </Button>

        <div className={styles.wrapperComments}>
          <Button className={styles.actionBarItem} onClick={handleCmt}>
            <FaComment />{' '}
            <span className={styles.actionBarItemLabel}>Comment</span>
          </Button>
          <div className={styles.wrapperCmts}>
            {isOpenCmt && cmts && (
              <TransitionsModal
                data={cmts}
                handleOpenModalClosedChild={handleOpenModalClosedParent}
                isOpenModal={isOpenCmt}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
