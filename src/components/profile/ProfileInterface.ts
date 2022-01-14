import { CreatorType } from "../../types/Creator/creatorTypes";
import { reduxUserInfo } from "../../types/reduxStore";
import { FollowersType } from "../../types/User/UserInterface";
import { SinglePostType } from "../feed/feedInterface";

export interface ProfReFetchType {
  reFetch: () => void;
}

export interface ProfUserFetchType extends ProfReFetchType {
  userInfo?: reduxUserInfo;
  fetchedUser?: reduxUserInfo;
}

export interface FetchedUserType extends ProfReFetchType {
  FetchedUser: { followers: FollowersType; user: reduxUserInfo };
}

export interface FetchedUserCreatorType extends FetchedUserType {
  FetchedCreator: CreatorType | undefined;
}

export interface PostReFetchTypeImprt extends ProfReFetchType {
  P: SinglePostType;
  loading?: string;
}

export interface FetchedUserCreatorImprt {
  FetchedUser: { followers: FollowersType; user: reduxUserInfo };
  FetchedCreator: CreatorType | undefined;
}
