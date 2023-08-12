import { useDispatch, useSelector } from "react-redux";
import { friendsSliceActions } from "../store/friendContent";
import PaidDetail from "./PaidDetail";
import classes from "./friendForm.module.css";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { IconButton, TextField} from "@mui/material";
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import PersonRemoveSharpIcon from '@mui/icons-material/PersonRemoveSharp';

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
      <TextField
        label="Friend Name"
        variant="outlined"
        type="text"
        id={"fname" + props.order}
        name="fname"
        value={props.data.friendName}
        onChange={formChangeHandler}
      />
      <span> </span>
      <IconButton onClick={addButtonHandler}><PersonAddSharpIcon/></IconButton>
      <span> </span>
      <IconButton onClick={removeButtonHandler} disabled={friends.length <= 1}>
      <PersonRemoveSharpIcon/>
      </IconButton>

      <PaidDetail ind={props.order}/>

      {props.order===friends.length-1 && <><br/><IconButton variant="contained" onClick={clearButtonHandler}><DeleteSharpIcon/></IconButton></> }
    </div>
  );
};

export default FriendForm;
