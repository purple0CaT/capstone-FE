export interface FollowerType {
  _id: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

export interface YouFollowType {
  _id: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

export interface FollowersType {
  _id?: string;
  followers: FollowerType[] | null | [];
  youFollow: YouFollowType[] | null | [];
  __v?: number;
}
