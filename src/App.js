import logo from "./logo.svg";
import "./App.css";
import FriendForm from "./components/FriendForm";
import DisplayBill from "./components/DisplayBill"
import { useSelector } from "react-redux";


function App() {
  const friends = useSelector((state) =>{
    return state.friendsSlice;
  } );

  return (
    <div className="App">
      <h1>Bill Splitter</h1>
      {friends.map((d, index) => (
        <FriendForm data={d} key={index} order={index}/>
      ))}
      <DisplayBill/>
    </div>
  );
}

export default App;
