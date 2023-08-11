import { useDispatch, useSelector } from "react-redux";
import { friendsSliceActions } from "../store/friendContent";
import PaidDetail from "./PaidDetail";
import classes from "./friendForm.module.css";

const FriendForm = (props) => {
  const dispatch = useDispatch();

  const friends = useSelector((state) => {
    return state.friendsSlice;
  });

  const removeButtonHandler = (e) => {
    e.preventDefault();
    dispatch(friendsSliceActions.removeFriend({ ind: props.order }));
  };

  const addButtonHandler = (e) => {
    e.preventDefault();

    dispatch(friendsSliceActions.addFriend());
  };

  const formChangeHandler = (e) => {
    dispatch(
      friendsSliceActions.setFriendName({
        change: e.target.value,
        ind: props.order,
      })
    );
  };

  const clearButtonHandler= (e) =>{
    e.preventDefault();
    dispatch( friendsSliceActions.resetFriends() )
  }

  return (
    <div className={classes.div}>
      <label htmlFor="fname">Friend name: </label>
      <input
        type="text"
        id={"fname" + props.order}
        name="fname"
        value={props.data.friendName}
        onChange={formChangeHandler}
      />
      <span> </span>
      <button onClick={addButtonHandler}>+</button>
      <span> </span>
      <button onClick={removeButtonHandler} disabled={friends.length <= 1}>
        -
      </button>

      <PaidDetail ind={props.order}/>

      {props.order===friends.length-1 && <><br/><button onClick={clearButtonHandler}>Clear</button></> }
    </div>
  );
};

export default FriendForm;
