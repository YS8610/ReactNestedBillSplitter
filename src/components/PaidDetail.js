import { useDispatch, useSelector } from "react-redux";
import { friendsSliceActions } from "../store/friendContent";
import Exclude from "./Exclude";
import classes from "./paidDetail.module.css";

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

  const placeFormHandler = (e) => {
    dispatch(
      friendsSliceActions.setPaidDetailPlace({
        ind: props.ind,
        ind1: e.target.getAttribute("data-index"),
        place: e.target.value,
      })
    );
  };

  const commentFormHandler = (e) => {
    dispatch(
      friendsSliceActions.setPaidDetailComment({
        ind: props.ind,
        ind1: e.target.getAttribute("data-index"),
        comment: e.target.value,
      })
    );
  };

  const paidAmtFormHandler=(e)=>{
    dispatch(
      friendsSliceActions.setPaidDetailAmt({
        ind: props.ind,
        ind1: e.target.getAttribute("data-index"),
        paidAmt: e.target.value,
      })
    )
  }

  return (
    <div className={classes.div}>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Paid Amount</th>
            <th>Comment</th>
            <th>Operation</th>
            <th>Exclude</th>
          </tr>
        </thead>
        <tbody>
          {friends[props.ind].paidInfo.map((row, index) => {
            return (
              <tr>
                {/* input for place */}
                <td>
                  <input
                    type="text"
                    id={"place" + props.ind + "_" + index}
                    onChange={placeFormHandler}
                    value={row.place}
                    data-index={index}
                  />
                </td>
                {/* input for paid amount */}
                <td>
                <input
                    type="number"
                    id={"paidAmt" + props.ind + "_" + index}
                    step=".01"
                    onChange={paidAmtFormHandler}
                    value={row.paidAmt}
                    data-index={index}
                  />
                </td>
                {/* input for comment */}
                <td>
                  <input
                    type="text"
                    id={"comment" + props.ind + "_" + index}
                    onChange={commentFormHandler}
                    value={row.comment}
                    data-index={index}
                  />
                </td>
                <td>
                  <button onClick={addButtonHandler}>+</button>
                  <span>  </span>
                  <button
                    onClick={removeButtonHandler}
                    data-index={index}
                    disabled={friends[props.ind].paidInfo.length <= 1}
                  >
                    -
                  </button>
                </td>
                <td>
                  <Exclude ind={props.ind} ind1={index} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaidDetail;
