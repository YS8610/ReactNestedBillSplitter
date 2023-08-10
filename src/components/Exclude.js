import React from "react";
import classes from "./exclude.module.css";
import { useDispatch, useSelector } from "react-redux";
import { friendsSliceActions } from "../store/friendContent";

const Exclude = (props) => {

  const friends = useSelector((state) => {
    return state.friendsSlice;
  });

  const ex = friends[props.ind].paidInfo[props.ind1].exclude;

  const dispatch = useDispatch();

  const checkboxArray = (e, pos) => {
    if (e.target.checked) {
      dispatch(
        friendsSliceActions.addPaidDetailExclude({
          ind: props.ind,
          ind1: props.ind1,
          f: pos,
        })
      );
    } else {
      dispatch(
        friendsSliceActions.removePaidDetailExclude({
          ind: props.ind,
          ind1: props.ind1,
          f: pos,
        })
      );
    }
  };


  return (
    <>
      {friends.map((f, index) => (
        <span className={classes.span}>
          <input
            key={index + "_" + props.ind + "_" + props.ind1}
            type="checkbox"
            name={f.friendName + "_" + props.ind + "_" + props.ind1}
            value={index}
            id={f.friendName + "_" + index + "_" + props.ind + "_" + props.ind1}
            onChange={(e) => checkboxArray(e, index)}
            checked={ex.includes(index) }
          />
          <label
            htmlFor={
              f.friendName + "_" + index + "_" + props.ind + "_" + props.ind1
            }
          >
            {" "}
            {f.friendName}
          </label>
        </span>
      ))}
    </>
  );
};

export default Exclude;
