import { Account, Status } from "./api";

export type StackParamList = {
  Login: any,
  Home: any,
  AccountDetail: { account: Account },
  AccountFollowersList: { account: Account },
  AccountFollowingList: { account: Account },
  StatusDetail: { status: Status },
  StatusFavouritedList: { status: Status },
  StatusRebloggedList: { status: Status },
}
