import * as React from 'react';
import { ReactNode } from 'react';

import { IPost, Post } from './post';

interface IFeedProps {
  posts: IPost['post'][];
  onLike: (index: number) => void;
}

export default function Feed(props: IFeedProps) {
  var posts: ReactNode[] = [];

  props.posts.map((post: IPost['post'], index: number) => {
    posts.push(
      <Post key={index} index={index} post={post} onLike={props.onLike} />
    );
  });
  return <>{posts}</>;
}
