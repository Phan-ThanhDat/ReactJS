import * as React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

import { Button } from './components/button';
import PostList from './components/feed';
import { Form } from './components/form';
import logo from './images/smarp-logo.png';
import styles from './smarp-app.module.css';

export class SmarpApp extends React.Component<
  {},
  { posts: any[]; isOpen: boolean }
> {
  constructor(props: any) {
    super(props);

    this.onLike = this.onLike.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { posts: [], isOpen: false };

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
    const posts = this.state.posts;
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

    updatedPosts.push({
      title: payload.title,
      body: payload.body,
    });

    this.setState({
      posts: updatedPosts.reverse(),
    });

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
            <Button
              onClick={function (this: any) {
                this.setState({
                  isOpen: true,
                });
              }.bind(this)}
            >
              Create a post
            </Button>
          </div>

          <PostList posts={posts} onLike={this.onLike} />
        </div>

        <Modal
          isOpen={isOpen}
          className={styles.reactModalContent}
          overlayClassName={styles.reactModalOverlay}
        >
          <div className={styles.modalContentHelper}>
            <div
              className={styles.modalClose}
              onClick={function (this: any) {
                this.setState({
                  isOpen: false,
                });
              }.bind(this)}
            >
              <FaTimes />
            </div>

            <Form on-submit={this.onSubmit} />
          </div>
        </Modal>
      </div>
    );
  }
}
