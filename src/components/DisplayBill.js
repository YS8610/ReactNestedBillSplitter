import React from "react";
import { useSelector } from "react-redux";
import classes from "./displayBill.module.css";
import toast, { Toaster } from 'react-hot-toast';

const DisplayBill = (props) => {
  const friends = useSelector((state) => {
    return state.friendsSlice;
  });

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const paidContent = [];
  const totalbill = [];
  for (let f of friends) {
    const cont = { fName: f.friendName, paidDetail: [] };
    for (let paid of f.paidInfo) {
      if (paid.paidAmt > 0) {
        cont.paidDetail.push(
          "$" +
            parseFloat(paid.paidAmt) +
            " @" +
            paid.place +
            " for " +
            paid.comment
        );
        totalbill.push(paid.paidAmt);
      }
    }
    if (cont.paidDetail.length > 0) paidContent.push(cont);
  }
  let totalAmt = 0;
  if (totalbill.length > 0)
    totalAmt = totalbill.reduce((m1, m2) => parseFloat(m1) + parseFloat(m2));

  const flattenStructure = [];
  for (let f of friends) {
    for (let pay of f.paidInfo) {
      if (pay.paidAmt > 0) {
        flattenStructure.push({
          fname: f.friendName,
          place: pay.place,
          paid: pay.paidAmt,
          comt: pay.comment,
          ex:
            pay.exclude.length > 0
              ? pay.exclude.reduce((m1, m2) => m1 + "," + m2)
              : " ",
        });
      }
    }
  }
  const grpEx = flattenStructure.reduce((x, y) => {
    (x[y.ex] = x[y.ex] || []).push(y);
    return x;
  }, {});

  const grpExCombine = {};
  Object.keys(grpEx).forEach((k) => {
    let sum = 0;
    let tArray = (k.trim() + "").split(",");

    for (let x of grpEx[k]) sum -= parseFloat(x.paid);
    if (k === " " || tArray.length >= friends.length)
      sum = +(sum / friends.length).toFixed(3);
    else {
      sum = +(sum / (friends.length - tArray.length)).toFixed(3);
    }
    grpExCombine[k] = sum;
  });

  const friendCountArray = [...Array(friends.length).keys()];
  const allFriend = friendCountArray.reduce((m1, m2) => m1 + "," + m2);
  let grpInCombine = {};
  for (const k in grpExCombine) {
    let tempA = ("" + k.trim()).split(",");
    if (k === " " || tempA.length === friends.length) {
      if (Object.keys(grpInCombine).includes("" + allFriend))
        grpInCombine[allFriend] += grpExCombine[k];
      else grpInCombine[allFriend] = grpExCombine[k];
    } else {
      let diff = friendCountArray.filter((x) => !tempA.includes("" + x));
      let str = diff.reduce((m1, m2) => m1 + "," + m2);
      grpInCombine[str] = grpExCombine[k];
    }
  }

  const fBill = [];
  for (let i = 0, n = friends.length; i < n; i++) {
    let tmpArray = [];
    for (let paid of friends[i].paidInfo) {
      if (+paid.paidAmt > 0) tmpArray.push(paid.paidAmt);
    }
    for (const k in grpInCombine) {
      let a = k.split(",");
      if (a.includes("" + i)) tmpArray.push(grpInCombine[k]);
    }
    fBill.push(tmpArray);
  }

  const textBill = () => {
    const paidC = "";
    const str = ["Bill\n\n"];
    for (let pC of paidContent) {
      str.push(pC.fName + " paid\n");
      pC.paidDetail.forEach((x) => str.push(x + "\n"));
    }
    let tempStr = ["\n\nTotalBill = "];
    if (totalAmt > 0) {
      for (let i = 0, n = totalbill.length; i < n; i++) {
        if (i === 0) tempStr.push("$" + +totalbill[i]);
        else tempStr.push("+$" + +totalbill[i]);
      }
      tempStr.push(" = $" + totalAmt + "\n");
    }
    str.push(tempStr.join(""));
    let tempStr1 = [];
    let sum = 0;
    for (let i = 0, n = friends.length; i < n; i++) {
      tempStr1.push("\n" + friends[i].friendName + " = ");
      fBill[i].forEach((x, index) => {
        if (+x >= 0) {
          if (index === 0) tempStr1.push("$" + +x);
          else tempStr1.push("+$" + +x);
        } else {
          tempStr1.push("-$" + +x * -1);
        }
      });
      if (fBill[i].length > 0) {
        sum = fBill[i].reduce((m1, m2) => parseFloat(m1) + parseFloat(m2));
      }
      tempStr1.push(" = " + USDollar.format(sum));
    }
    str.push(tempStr1.join(""));
    str.push("\n\ngenerated from https://ys8610.github.io/ReactNestedBillSplitter/")
    return str;
  };

  const copyButtonHandler = async (e) => {
    e.preventDefault();
    try{
      await navigator.clipboard.writeText( textBill().join("") );
      toast.success('Copied!');
    }
    catch (e){
      toast.error(`Error: ${e.message}`);
    }
  };

  return (
    <div className={classes.div}>
      <h1>Bill</h1>
      {paidContent.length > 0 &&
        paidContent.map((pC) => {
          return (
            <div className={classes.paid}>
              <b>{pC.fName} paid</b>
              {pC.paidDetail.map((x) => {
                return (
                  <>
                    <br />
                    {x}
                  </>
                );
              })}
            </div>
          );
        })}
      <br />
      <div className={classes.paid}>
        <b>TotalBill</b> ={" "}
        {totalAmt > 0 &&
          totalbill.map((x, index) =>
            index > 0 ? <>+${+x}</> : <>${+x}</>
          )}{" "}
        = ${totalAmt}
      </div>
      <br />
      {/* <pre>{JSON.stringify(fBill, null, "\t")}</pre> */}
      <div className={classes.paid}>
        {fBill.map((x, index) => {
          return (
            <span>
              <b>{friends[index].friendName} bill</b> ={" "}
              {fBill[index].map((y, index) => {
                return (
                  <>
                    {+y > 0
                      ? index === 0
                        ? "$" + +y
                        : "+$" + +y
                      : "-$" + +y * -1}{" "}
                  </>
                );
              })}{" "}
              ={" "}
              {fBill[index].length > 0 &&
                USDollar.format(
                  fBill[index].reduce(
                    (m1, m2) => parseFloat(m1) + parseFloat(m2)
                  )
                )}
              <br />
            </span>
          );
        })}
      </div>
      <button onClick={copyButtonHandler}>Copy</button>
      <Toaster/>
    </div>
  );
};

export default DisplayBill;
