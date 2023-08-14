export interface Friend{
  friendName:string,
  paidInfo: PaidInfo[]
}

export interface PaidInfo{
  place:string,
  paidAmt: string,
  comment:string,
  exclude: number[]
}