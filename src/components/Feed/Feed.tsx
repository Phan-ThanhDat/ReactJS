import * as React from 'react';
import { ReactNode } from 'react';

import { IFeedProps, IPost } from '../../types';
import Post from '../Post/Post';

export default function Feed(props: IFeedProps) {
  var posts: ReactNode[] = [];
  const { cmts } = props;

  props.posts.map((post: IPost['post'], index: number) => {
    const filtered = cmts?.filter((cmt) => cmt.postId == post.id);

    posts.push(
      <Post
        key={index}
        index={index}
        post={post}
        cmts={filtered}
        onLike={props.onLike}
      />
    );
  });
  return <>{posts}</>;
}
