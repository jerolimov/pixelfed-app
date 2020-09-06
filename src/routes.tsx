import { Account, Status } from "./api";

export type StackParamList = {
  Login: any,
  TimelineHome: any,
  AccountDetail: { account: Account },
  AccountFollowersList: { account: Account },
  AccountFollowingList: { account: Account },
  StatusDetail: { status: Status, aspectRatio: number },
  StatusFavouritedList: { status: Status },
  StatusRebloggedList: { status: Status },
}
