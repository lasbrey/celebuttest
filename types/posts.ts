export interface Post {
  id: string;
  content: string;
  created_at: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  media: string[];
  liked: boolean;
}




export interface PostComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  created_at: string;
}