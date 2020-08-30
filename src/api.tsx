import { baseUrl, accessToken } from "./config";

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

export const getTimelineHome = async (): Promise<Status[]> => {
  const headers = {
    Authorization: 'Bearer ' + accessToken,
    Accept: 'application/json',
  }
  const response = await fetch(`${baseUrl}/api/v1/timelines/home`, { headers });
  if (response.status === 429) {
    console.warn('too many requests:', response.headers);
    throw new Error(`429 Too Many Requests`);
  } else if (response.status !== 200) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response.json();
}

export const getAccount = async (id: string): Promise<Account> => {
  const headers = {
    Authorization: 'Bearer ' + accessToken,
    Accept: 'application/json',
  }
  const response = await fetch(`${baseUrl}/api/v1/accounts/${id}`, { headers });
  if (response.status === 429) {
    console.warn('too many requests:', response.headers);
    throw new Error(`429 Too Many Requests`);
  } else if (response.status !== 200) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response.json();
}

export const getAccountStatuses = async (id: string): Promise<Status[]> => {
  const headers = {
    Authorization: 'Bearer ' + accessToken,
    Accept: 'application/json',
  }
  const response = await fetch(`${baseUrl}/api/v1/accounts/${id}/statuses`, { headers });
  if (response.status === 429) {
    console.warn('too many requests:', response.headers);
    throw new Error(`429 Too Many Requests`);
  } else if (response.status !== 200) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response.json();
}
