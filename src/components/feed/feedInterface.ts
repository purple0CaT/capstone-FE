import { LatLngTuple } from "leaflet";

export interface RefetchInterface {
  reFetch: () => void;
}
export interface PostRefetchImprt extends RefetchInterface {
  post: SinglePostType;
}
export interface CreatePostImprt extends RefetchInterface {
  handleClose: () => void;
}
export interface LocationImprt {
  location: LocationType;
}

// === POST ===

export interface LocationType {
  title: string;
  cord: LatLngTuple;
}

export interface PostAuthorType {
  _id: string;
  firstname: string;
  lastname: string;
  avatar: string;
  creator: string;
}

export interface CommentAuthorType {
  _id: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

export interface SingleCommentType {
  _id: string;
  text: string;
  author: CommentAuthorType;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface SinglePostType {
  location: LocationType;
  _id: string;
  text: string;
  media: string;
  author: PostAuthorType;
  likes: string[];
  comments: SingleCommentType[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
