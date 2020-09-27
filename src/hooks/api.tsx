import { useInfiniteQuery, useMutation, queryCache, useQuery } from 'react-query';

import { getTimelineHome, getStatus, setStatusFavourited, Status } from '../api';

export { Status } from '../api';

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
    () => getStatus(status),
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
