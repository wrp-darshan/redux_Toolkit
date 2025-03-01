import "./App.css";
import Header from "./Components/Header/Header";
import UserList from "./Components/UserList/UserList";
import UserPopUp from "./Components/UserPopUp/UserPopUp";

function App() {
  return (
    <>
      <Header/>
      <UserPopUp/>
      <UserList/>
    </>
  );
}

export default App;
