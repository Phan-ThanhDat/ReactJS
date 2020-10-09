import * as React from 'react';
import { ReactNode } from 'react';
import { ICmts } from '../../pages/smarp-app';
import Post, { IPost } from '../Post/Post';

interface IFeedProps {
  cmts: ICmts[];
  posts: IPost['post'][];
  onLike: (index: number) => void;
}

export default function Feed(props: IFeedProps) {
  var posts: ReactNode[] = [];
  const { cmts } = props;

  props.posts.map((post: IPost['post'], index: number) => {
    const filtered = cmts?.filter((cmt) => cmt.postId == post.id);

    posts.push(
      <Post
        key={index}
        index={post?.id || index}
        post={post}
        cmts={filtered}
        onLike={props.onLike}
      />
    );
  });
  return <>{posts}</>;
}
