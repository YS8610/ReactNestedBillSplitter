import { useDispatch, useSelector } from "react-redux";
import { friendsSliceActions } from "../store/friendContent";
import PaidDetail from "./PaidDetail";
import classes from "./friendForm.module.css";
import { IconButton, TextField, Tooltip, InputAdornment } from "@mui/material";
import { Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import PersonRemoveSharpIcon from "@mui/icons-material/PersonRemoveSharp";

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

  const clearButtonHandler = (e) => {
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
            {/* <IconButton variant="contained" onClick={clearButtonHandler}>
              <DeleteSharpIcon />
            </IconButton> */}
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={clearButtonHandler}
            >
              Clear
            </Button>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default FriendForm;
