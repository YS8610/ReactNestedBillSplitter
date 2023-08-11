import { createSlice } from "@reduxjs/toolkit";

const intialFriends = [
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
    ? JSON.parse(localStorage.getItem("friends"))
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
    removeFriend(state, action) {
      state.splice(action.payload.ind, 1);
      state.map((f) => f.paidInfo.map((pInfo) => (pInfo.exclude = [])));
      localStorage.setItem("friends", JSON.stringify(state));
    },
    setFriendName(state, action) {
      state[action.payload.ind].friendName = action.payload.change;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    addPaidDetail(state, action) {
      state[action.payload.ind].paidInfo = [
        ...state[action.payload.ind].paidInfo,
        { place: "", paidAmt: 0, comment: "", exclude: [] },
      ];
      localStorage.setItem("friends", JSON.stringify(state));
    },
    removePaidDetail(state, action) {
      state[action.payload.ind].paidInfo.splice(action.payload.ind1, 1);
      localStorage.setItem("friends", JSON.stringify(state));
    },
    setPaidDetailPlace(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.place = action.payload.place;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    setPaidDetailAmt(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.paidAmt = action.payload.paidAmt;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    setPaidDetailComment(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.comment = action.payload.comment;
      localStorage.setItem("friends", JSON.stringify(state));
    },
    addPaidDetailExclude(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      const set = new Set(paidInfoX.exclude);
      set.add(action.payload.f);
      paidInfoX.exclude = [...set].toSorted();
      localStorage.setItem("friends", JSON.stringify(state));
    },
    removePaidDetailExclude(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.exclude = paidInfoX.exclude.filter(
        (x) => x !== action.payload.f
      );
      localStorage.setItem("friends", JSON.stringify(state));
    },
  },
});

export default friendsSlice;
export const friendsSliceActions = friendsSlice.actions;
