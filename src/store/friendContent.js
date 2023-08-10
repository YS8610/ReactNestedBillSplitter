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
    paidInfo: [
      { place: "cafe", paidAmt: "9", comment: "taxi", exclude: [] },
    ],
  },
];

const friendsSlice = createSlice({
  name: "friendContent",
  initialState: intialFriends,
  reducers: {
    addFriend(state) {
      return [
        ...state,
        {
          friendName: "friend" + (state.length + 1),
          paidInfo: [{ place: "", paidAmt: 0, comment: "", exclude: [] }],
        },
      ];
    },
    removeFriend(state, action) {
      state.splice(action.payload.ind, 1);
      state.map((f) => f.paidInfo.map((pInfo) => (pInfo.exclude = [])));
    },
    setFriendName(state, action) {
      state[action.payload.ind].friendName = action.payload.change;
    },
    addPaidDetail(state, action) {
      state[action.payload.ind].paidInfo = [
        ...state[action.payload.ind].paidInfo,
        { place: "", paidAmt: 0, comment: "", exclude: [] },
      ];
    },
    removePaidDetail(state, action) {
      state[action.payload.ind].paidInfo.splice(action.payload.ind1, 1);
    },
    setPaidDetailPlace(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.place = action.payload.place;
    },
    setPaidDetailAmt(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.paidAmt = action.payload.paidAmt;
    },
    setPaidDetailComment(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.comment = action.payload.comment;
    },
    addPaidDetailExclude(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      const set = new Set(paidInfoX.exclude);
      set.add(action.payload.f);
      paidInfoX.exclude = [...set].toSorted();
    },
    removePaidDetailExclude(state, action) {
      const friendX = state[action.payload.ind];
      const paidInfoX = friendX.paidInfo[action.payload.ind1];
      paidInfoX.exclude = paidInfoX.exclude.filter(
        (x) => x !== action.payload.f
      );
    },
  },
});

export default friendsSlice;
export const friendsSliceActions = friendsSlice.actions;
