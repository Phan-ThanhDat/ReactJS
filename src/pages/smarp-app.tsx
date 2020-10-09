import * as React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import useSWR from 'swr';

import Button from '../components/Button';
import PostList from '../components/Feed';
import Form from '../components/Form';
import logo from '../images/smarp-logo.png';
import styles from './smarp-app.module.css';
import { IPost } from '../components/Post';
import { useFetchAPIs } from '../components/hooks/useFetchData';
import Loading from '../components/Loading';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface ICmts {
  body: string;
  email: string;
  name: string;
  id: number;
  postId: number;
}

export interface ISmarp {
  posts: IPost['post'][];
  cmts: ICmts[];
  isOpen: boolean;
}
// export default class SmarpApp extends React.Component<{}, ISmarp> {
//   constructor(props: any) {
//     super(props);

//     this.onLike = this.onLike.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onCreatingPost = this.onCreatingPost.bind(this);

//     this.state = { posts: [], isOpen: false };
//   }

//   componentDidMount() {
//     // move fetch api feature to componentDidMount with 2 reasons:
//     // we often fetch api in componentDidMount and setState is not on Constructor,
//     // because if we set-state in Constructor,
//     // component will re-render when it has not been rendered yet
//     fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
//       const jsonResponse = response.json();

//       jsonResponse.then((rawData) => {
//         const data = [];

//         for (let i = 0; i < rawData.length; i++) {
//           const updatedPost = rawData[i];
//           updatedPost.likesCount = 0;

//           data.push(updatedPost);
//         }

//         this.setState({
//           posts: data,
//         });
//       });
//     });
//   }

//   onLike(index: number) {
//     // Should clone to new array, because when set-state, the posts array has the same
//     // address with this.state.posts, so the component will not re-render
//     // even we did modify something.
//     const posts = this.state.posts.slice();
//     const post = posts[index];

//     if (post.isLiked) {
//       post.likesCount = post.likesCount - 1;
//       post.isLiked = false;
//     } else {
//       post.likesCount = post.likesCount + 1;
//       post.isLiked = true;
//     }

//     this.setState({ posts });
//   }

//   onSubmit(payload: { title: string; body: string }) {
//     const updatedPosts = this.state.posts.slice();

//     // Missing type of IPost["post"]
//     updatedPosts.push({
//       title: payload.title,
//       body: payload.body,
//       isLiked: false,
//       likesCount: 0,
//     });

//     // should not set-state 2 times, because the component will re-render 2 times
//     this.setState({
//       posts: updatedPosts.reverse(),
//     });

//     this.setState({
//       isOpen: false,
//     });
//   }

//   // Should define function here to maintain/refactor easily
//   onCreatingPost() {
//     this.setState({
//       isOpen: true,
//     });
//   }

//   // Should define function here to maintain/refactor easily
//   onModal() {
//     this.setState({
//       isOpen: false,
//     });
//   }

//   render() {
//     const { posts, isOpen } = this.state;

//     return (
//       <div>
//         <header className={styles.header}>
//           <div className={`container ${styles.headerImageWrapper}`}>
//             <img src={logo} className={styles.headerImage} alt='logo' />
//           </div>
//         </header>

//         <div className={`container ${styles.main}`}>
//           <div className={styles.buttonWrapper}>
//             <Button onClick={this.onCreatingPost}>Create a post</Button>
//           </div>

//           <PostList posts={posts} onLike={this.onLike} />
//         </div>

//         <Modal
//           isOpen={isOpen}
//           className={styles.reactModalContent}
//           overlayClassName={styles.reactModalOverlay}
//         >
//           <div className={styles.modalContentHelper}>
//             <div className={styles.modalClose} onClick={this.onModal}>
//               <FaTimes />
//             </div>

//             <Form on-submit={this.onSubmit} />
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }

export default function SmarpApp() {
  const [posts, setPosts] = React.useState<IPost['post'][]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [cmts, setCmts] = React.useState<ICmts[]>([]);

  const { data } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  const dataClone: IPost['post'][] = [];

  data?.map((item: IPost['post'], i: number) => {
    const updatedPost = item;
    updatedPost.likesCount = 0;
    dataClone.push(updatedPost);
  });

  React.useEffect(() => {
    setPosts(dataClone);
  }, [data]);

  const cmtsData = useFetchAPIs(
    'https://jsonplaceholder.typicode.com/comments',
    'comments'
  );
  const dataCmts = cmtsData.data;
  React.useEffect(() => {
    setCmts(dataCmts as any);
  }, [cmtsData.data]);

  const onLike = React.useCallback(
    (index: number) => {
      // Should clone to new array, because when set-state, the posts array has the same
      // address with this.state.posts, so the component will not re-render
      // even we did modify something.
      const postsClone = posts.slice();
      const post = postsClone[index];

      if (post.isLiked) {
        post.likesCount = post.likesCount - 1;
        post.isLiked = false;
      } else {
        post.likesCount = post.likesCount + 1;
        post.isLiked = true;
      }
      setPosts(postsClone);
    },
    [posts]
  );

  const onSubmit = (payload: { title: string; body: string }) => {
    const updatedPosts = posts.slice();

    // Missing type of IPost["post"]
    const newPosts = updatedPosts.concat({
      title: payload.title,
      body: payload.body,
      isLiked: false,
      likesCount: 0,
    });

    setPosts(newPosts.reverse());
    setIsOpen(false);
  };

  // Should define function here to maintain/refactor easily
  // then using React momoise (useCallback to avoid rerender Button comp by
  // posts depedency)
  const onCreatingPost = React.useCallback(() => {
    setIsOpen(true);
  }, [posts]);

  // Should define function here to maintain/refactor easily
  const onModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerImageWrapper}`}>
          <img src={logo} className={styles.headerImage} alt='logo' />
        </div>
      </header>

      <div className={`container ${styles.main}`}>
        <div className={styles.buttonWrapper}>
          <Button onClick={onCreatingPost}>Create a post</Button>
        </div>

        <PostList cmts={cmts} posts={posts} onLike={onLike} />
      </div>

      <Modal
        isOpen={isOpen}
        className={styles.reactModalContent}
        overlayClassName={styles.reactModalOverlay}
      >
        <div className={styles.modalContentHelper}>
          <div className={styles.modalClose} onClick={onModal}>
            <FaTimes />
          </div>

          <Form on-submit={onSubmit} />
        </div>
      </Modal>
    </>
  );
}
