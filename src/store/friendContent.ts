import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

import {Friend} from "../model"


const intialFriends:Friend[] = [
  {
    friendName: "friend1",
    paidInfo: [
      { place: "cafe", paidAmt: "199", comment: "food and drink", exclude: [] },
      { place: "cafe", paidAmt: "20", comment: "tip", exclude: [] },
    ],
  },
  {
    friendName: "friend2",
    paidInfo: [
      { place: "cafe", paidAmt: "30", comment: "waiter", exclude: [] },
    ],
  },
  {
    friendName: "friend3",
    paidInfo: [{ place: "cafe", paidAmt: "9", comment: "taxi", exclude: [] }],
  },
];

const mem =
  localStorage.getItem("friends") !== null
    ? JSON.parse(localStorage.getItem("friends")|| "{}")
    : intialFriends;

const friendsSlice = createSlice({
  name: "friendContent",
  initialState: mem,
  reducers: {
    resetFriends(state) {
      const resetState = [
        {
          friendName: "friend1",
          paidInfo: [{ place: "", paidAmt: 0, comment: "", exclude: [] }],
        },
      ];
      localStorage.setItem("friends", JSON.stringify(resetState));
      return resetState;
    },
    addFriend(state) {
      const addState = [
        ...state,
        {
          friendName: "friend" + (state.length + 1),
          paidInfo: [{ place: "", paidAmt: 0, comment: "", exclude: [] }],
        },
      ];
      localStorage.setItem("friends", JSON.stringify(addState));
      return addState;
    },
    removeFriend(state, action:PayloadAction<{ind:number}>) {
      state.splice(action.payload.ind, 1);
      state.map((f:Friend) => f.paidInfo.map((pInfo) => (pInfo.exclude = [])));
      localStorage.setItem("friends", JSON.stringify(state));
    },
    setFriendName(state, action:PayloadAction<{ind:number,change:string}>) {
      state[action.payload.ind].friendName = action.payload.change;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    addPaidDetail(state, action:PayloadAction<{ind:number}>) {
      state[action.payload.ind].paidInfo = [
        ...state[action.payload.ind].paidInfo,
        { place: "", paidAmt: 0, comment: "", exclude: [] },
      ];
      localStorage.setItem("friends", JSON.stringify(state));
    },
    removePaidDetail(state, action:PayloadAction<{ind:number,ind1:number}>) {
      state[action.payload.ind].paidInfo.splice(action.payload.ind1, 1);
      localStorage.setItem("friends", JSON.stringify(state));
    },
    setPaidDetailPlace(state, action:PayloadAction<{ind:number,ind1:number,place:string}>) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.place = action.payload.place;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    setPaidDetailAmt(state, action:PayloadAction<{ind:number,ind1:number,paidAmt:string}>) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.paidAmt = action.payload.paidAmt;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    setPaidDetailComment(state, action:PayloadAction<{ind:number,ind1:number,comment:string}>) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.comment = action.payload.comment;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    addPaidDetailExclude(state, action:PayloadAction<{ind:number,ind1:number,f:number}>) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      const set = new Set<number>(paidInfoX.exclude);
      set.add(action.payload.f);
      const newSort = [...set]
      newSort.sort((m1:number,m2:number)=>m1-m2)
      // paidInfoX.exclude = [...set].toSorted();
      paidInfoX.exclude = newSort;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    removePaidDetailExclude(state, action:PayloadAction<{ind:number,ind1:number,f:number}>) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.exclude = paidInfoX.exclude.filter(
        (x:number) => x !== action.payload.f
      );
      localStorage.setItem("friends", JSON.stringify(state));
    },
  },
});

export default friendsSlice;
export const friendsSliceActions = friendsSlice.actions;
