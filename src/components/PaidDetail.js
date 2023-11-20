import { useDispatch, useSelector } from "react-redux";
import { friendsSliceActions } from "../store/friendContent";
import Exclude from "./Exclude";
import classes from "./paidDetail.module.css";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";

const PaidDetail = (props) => {
  const dispatch = useDispatch();

  const friends = useSelector((state) => {
    return state.friendsSlice;
  });

  const addButtonHandler = (e) => {
    e.preventDefault();
    dispatch(friendsSliceActions.addPaidDetail({ ind: props.ind }));
  };

  const removeButtonHandler = (e) => {
    dispatch(
      friendsSliceActions.removePaidDetail({
        ind: props.ind,
        ind1: e.target.getAttribute("data-index"),
      })
    );
  };

  const placeFormHandler = (e, index) => {
    dispatch(
      friendsSliceActions.setPaidDetailPlace({
        ind: props.ind,
        ind1: index,
        // ind1: e.target.getAttribute("data-index"),
        place: e.target.value,
      })
    );
  };

  const commentFormHandler = (e, index) => {
    dispatch(
      friendsSliceActions.setPaidDetailComment({
        ind: props.ind,
        ind1: index,
        // ind1: e.target.getAttribute("data-index"),
        comment: e.target.value,
      })
    );
  };

  const paidAmtFormHandler = (e, index) => {
    dispatch(
      friendsSliceActions.setPaidDetailAmt({
        ind: props.ind,
        ind1: index,
        // ind1: e.target.getAttribute("data-index"),
        paidAmt: e.target.value,
      })
    );
  };

  return (
    <div className={classes.div}>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Paid Amount</th>
            <th>Comment</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {friends[props.ind].paidInfo.map((row, index) => {
            return (
              <>
                <tr>
                  {/* input for place */}
                  <td>
                    <TextField
                      variant="outlined"
                      type="text"
                      label="Place"
                      id={"place" + props.ind + "_" + index}
                      onChange={(e) => placeFormHandler(e, index)}
                      value={row.place}
                      data-index={index}
                    />
                  </td>
                  {/* input for paid amount */}
                  <td>
                    <TextField
                      variant="filled"
                      type="number"
                      label="Paid Amount"
                      id={"paidAmt" + props.ind + "_" + index}
                      step=".01"
                      onChange={(e) => paidAmtFormHandler(e, index)}
                      value={row.paidAmt}
                      data-index={index}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneySharpIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </td>
                  {/* input for comment */}
                  <td>
                    <TextField
                      variant="filled"
                      type="text"
                      label="Comment"
                      id={"comment" + props.ind + "_" + index}
                      onChange={(e) => commentFormHandler(e, index)}
                      value={row.comment}
                      data-index={index}
                    />
                  </td>
                  <td>
                    <IconButton onClick={addButtonHandler}>
                      <AddSharpIcon />
                    </IconButton>
                    <span> </span>
                    <IconButton
                      onClick={removeButtonHandler}
                      data-index={index}
                      disabled={friends[props.ind].paidInfo.length <= 1}
                    >
                      <RemoveSharpIcon />
                    </IconButton>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <Exclude ind={props.ind} ind1={index} />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaidDetail;
