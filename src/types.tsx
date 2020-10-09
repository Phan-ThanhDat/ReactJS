import { AllHTMLAttributes } from 'react';

export interface IButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export interface IFeedProps {
  cmts: ICmts[];
  posts: IPost['post'][];
  onLike: (index: number) => void;
}

export interface IFormProps {
  'on-submit': (payload: { title: string; body: string }) => void;
}

export interface IFormValues {
  title: string;
  body: string;
}

export interface LoadingProps {
  classes?: {
    wrapper?: string;
    loader?: string;
  };
}

export interface IModal {
  data: any;
  isOpenModal: boolean;
  handleOpenModalClosedChild: (isOpen: boolean) => void;
}

export interface IPost {
  index: number;
  post: {
    title: string;
    body: string;
    likesCount: number;
    isLiked: boolean;
    id?: number;
  };
  cmts: ICmts[];
  onLike: (index: number) => void;
}

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
