import * as React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

import { Button } from './components/button';
import PostList from './components/feed';
import { Form } from './components/form';
import logo from './images/smarp-logo.png';
import styles from './smarp-app.module.css';
import { IPost } from './components/post';

export interface ISmarp {
  posts: IPost['post'][];
  isOpen: boolean;
}
export class SmarpApp extends React.Component<{}, ISmarp> {
  constructor(props: any) {
    super(props);

    this.onLike = this.onLike.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCreatingPost = this.onCreatingPost.bind(this);

    this.state = { posts: [], isOpen: false };
  }

  componentDidMount() {
    // move fetch api feature to componentDidMount with 2 reasons:
    // we often fetch api in componentDidMount and setState is not on Constructor,
    // because if we set-state in Constructor,
    // component will re-render when it has not been rendered yet
    fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
      const jsonResponse = response.json();

      jsonResponse.then((rawData) => {
        const data = [];

        for (let i = 0; i < rawData.length; i++) {
          const updatedPost = rawData[i];
          updatedPost.likesCount = 0;

          data.push(updatedPost);
        }

        this.setState({
          posts: data,
        });
      });
    });
  }

  onLike(index: number) {
    // Should clone to new array, because when set-state, the posts array has the same
    // address with this.state.posts, so the component will not re-render
    // even we did modify something.
    const posts = this.state.posts.slice();
    const post = posts[index];

    if (post.isLiked) {
      post.likesCount = post.likesCount - 1;
      post.isLiked = false;
    } else {
      post.likesCount = post.likesCount + 1;
      post.isLiked = true;
    }

    this.setState({ posts });
  }

  onSubmit(payload: { title: string; body: string }) {
    const updatedPosts = this.state.posts.slice();

    // Missing type of IPost["post"]
    updatedPosts.push({
      title: payload.title,
      body: payload.body,
      isLiked: false,
      likesCount: 0,
    });

    this.setState({
      posts: updatedPosts.reverse(),
    });

    this.setState({
      isOpen: false,
    });
  }

  // Should define function here to maintain/refactor easily
  onCreatingPost() {
    this.setState({
      isOpen: true,
    });
  }

  // Should define function here to maintain/refactor easily
  onModal() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { posts, isOpen } = this.state;

    return (
      <div>
        <header className={styles.header}>
          <div className={`container ${styles.headerImageWrapper}`}>
            <img src={logo} className={styles.headerImage} alt='logo' />
          </div>
        </header>

        <div className={`container ${styles.main}`}>
          <div className={styles.buttonWrapper}>
            <Button onClick={this.onCreatingPost}>Create a post</Button>
          </div>

          <PostList posts={posts} onLike={this.onLike} />
        </div>

        <Modal
          isOpen={isOpen}
          className={styles.reactModalContent}
          overlayClassName={styles.reactModalOverlay}
        >
          <div className={styles.modalContentHelper}>
            <div className={styles.modalClose} onClick={this.onModal}>
              <FaTimes />
            </div>

            <Form on-submit={this.onSubmit} />
          </div>
        </Modal>
      </div>
    );
  }
}
