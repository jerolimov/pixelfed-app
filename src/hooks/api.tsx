import axios from 'axios';
import { useInfiniteQuery, useMutation, queryCache, useQuery } from 'react-query';

import { Status } from '../api';
import { accessToken, baseUrl } from '../config';

export { Status } from '../api';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: 'Bearer ' + accessToken,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getTimelineHome = async (params: { page?: number, min_id?: number, max_id?: number, limit?: number }): Promise<Status[]> => {
  const response = await api.get<Status[]>('/api/v1/timelines/home', { params });
  return response.data;
}

const setStatusFavourited = async (status: Status, favourited: boolean): Promise<Status> => {
  const response = await api.post<Status>(`/api/v1/statuses/${status.id}/${favourited ? 'favourite' : 'unfavourite'}`);
  const result: Status = response.data;
  return {
    ...result,
    favourited,
  }
}

export function useTimelineHome() {
  return useInfiniteQuery<Status[], Error>(
    'timelineHome',
    (a, b, c) => {
      console.log('getTimelineHome', a, b, c);
      return getTimelineHome({ ...b, limit: 1 });
    },
    {
      getFetchMore: (lastPage: Status[], allPages: Status[][]) => {
        console.log('getFetchMore');
        if (lastPage.length > 0) {
          return { max_id: lastPage[lastPage.length - 1].id };
        }
        return false;
      }
    },
  );
}

export function useStatus(status: Status) {
  return useQuery<Status, Error>(
    ['status', status.id],
    async () => (await api.get<Status>(`/api/v1/statuses/${status.id}`)).data,
  );
}

const replaceStatuseses = (newStatus: Status) => (statuseses?: Status[][]) =>
  statuseses?.map(ss => ss.map(s => s.id === newStatus.id ? newStatus : s)) || [];

export function useSetStatusFavourited() {
  return useMutation<Status, Error, { status: Status, favourited: boolean }>(
    async ({ status, favourited }) => {
      const changedStatus = await setStatusFavourited(status, favourited);
      const timelineHome = queryCache.getQuery<Status[][]>(['timelineHome'])
      timelineHome?.setData(replaceStatuseses(changedStatus));
      const singleStatus = queryCache.getQuery<Status>(['status', changedStatus.id])
      singleStatus?.setData(changedStatus);
      return changedStatus;
    },
  );
}
