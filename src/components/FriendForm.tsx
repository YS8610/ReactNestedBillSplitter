import { useDispatch, useSelector } from "react-redux";
import { friendsSliceActions } from "../store/friendContent";
import {RootState} from "../store/indexStore";
import PaidDetail from "./PaidDetail";
import classes from "./friendForm.module.css";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { IconButton, TextField, Tooltip, InputAdornment } from "@mui/material";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import PersonRemoveSharpIcon from "@mui/icons-material/PersonRemoveSharp";
import {Friend} from "../model";


const FriendForm: React.FC<{order:number,data:Friend}> = (props) => {
  const dispatch = useDispatch();

  const friends = useSelector((state:RootState) => {
    return state.friendsSlice;
  });

  const removeButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(friendsSliceActions.removeFriend({ ind: props.order }));
  };

  const addButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(friendsSliceActions.addFriend());
  };

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      friendsSliceActions.setFriendName({
        change: e.target.value,
        ind: props.order,
      })
    );
  };

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(friendsSliceActions.resetFriends());
  };



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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={addButtonHandler}>
                <PersonAddSharpIcon />
              </IconButton>
              <IconButton
                onClick={removeButtonHandler}
                disabled={friends.length <= 1}
              >
                <PersonRemoveSharpIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <PaidDetail ind={props.order} />

      {props.order === friends.length - 1 && (
        <>
          <br />
          <Tooltip title="Clear" arrow>
            {/* <IconButton variant="contained" onClick={clearButtonHandler}> */}
            <IconButton onClick={clearButtonHandler}>
              <DeleteSharpIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default FriendForm;
