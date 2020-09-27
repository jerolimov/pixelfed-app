import axios from 'axios';

import { baseUrl, accessToken } from "./config";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: 'Bearer ' + accessToken,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export type Visibility = 'public';
export type Language = string;

export interface Tag {
  name: string;
  url: string;
}

export interface Account {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  created_at: number;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  note: string;
  url: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  emojis: never[];
  moved: never;
  fields: never;
  bot: boolean;
  software: string;
  is_admin: boolean;
}

export interface MediaAttachment {
  id: string;
  type: 'image';
  url: string;
  remote_url: string | null;
  preview_url: string;
  text_url: string | null;
  meta: never;
  description: never;
}

export interface Status {
  id: string;
  created_at: string;
  in_reply_to_id: never;
  in_reply_to_account_id: never;
  sensitive: boolean;
  spoiler_text: string;
  visibility: Visibility;
  language: Language;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  reblogged: boolean;
  favourited: boolean;
  muted: boolean;
  bookmarked: boolean;
  pinned: boolean;
  content: string;
  reblog: never;
  application: {
    name: string;
    website: never;
  };
  mentions: never[];
  tags: Tag[];
  emojis: never[];
  card: never;
  poll: never;
  account: Account;
  media_attachments: MediaAttachment[];
}

export const getTimelineHome = async (params: { page?: number, min_id?: number, max_id?: number, limit?: number }): Promise<Status[]> => {
  const response = await api.get<Status[]>('/api/v1/timelines/home', { params });
  return response.data;
}

export const getAccount = async (account: Account): Promise<Account> => {
  const response = await api.get<Account>(`/api/v1/accounts/${account.id}`);
  return response.data;
}

export const getAccountStatuses = async (account: Account): Promise<Status[]> => {
  const response = await api.get<Status[]>(`/api/v1/accounts/${account.id}/statuses`);
  return response.data;
}

export const getAccountFollowers = async (account: Account): Promise<Account[]> => {
  const response = await api.get<Account[]>(`/api/v1/accounts/${account.id}/followers`);
  return response.data;
}

export const getAccountFollowing = async (account: Account): Promise<Account[]> => {
  const response = await api.get<Account[]>(`/api/v1/accounts/${account.id}/following`);
  return response.data;
}

export const getStatus = async (status: Status): Promise<Status> => {
  const response = await api.get<Status>(`/api/v1/statuses/${status.id}`);
  return response.data;
}

export const getStatusFavouritedBy = async (status: Status): Promise<Account[]> => {
  const response = await api.get<Account[]>(`/api/v1/statuses/${status.id}/favourited_by`);
  return response.data;
}

export const setStatusFavourited = async (status: Status, favourited: boolean): Promise<Status> => {
  const response = await api.post<Status>(`/api/v1/statuses/${status.id}/${favourited ? 'favourite' : 'unfavourite'}`);
  return {
    ...response.data,
    favourited,
  }
}

export const getStatusRebloggedBy = async (status: Status): Promise<Account[]> => {
  const response = await api.get<Account[]>(`/api/v1/statuses/${status.id}/reblogged_by`);
  return response.data;
}
