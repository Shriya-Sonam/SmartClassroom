import React, { Fragment,useContext,useReducer, createContext,useEffect} from "react";
import { BrowserRouter as Router, Redirect, Route, useHistory,Switch } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Tpost from "./posts/Tpost";
import { initialState, reducer } from "./reducer/reducer";
import HNavbar from "./Partials/Navbar";
import "./App.css";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = localStorage.getItem("jwt");
    if (user) {
      dispatch({ type: "USER", payload: user });
    } 
  },[dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={() => <h1>HomePage</h1>} />
      {!state && <Route exact path="/register" component={Register} />}
      {!state && <Route exact path="/login" component={Login} />}
      {state && <Route exact path="/tpost" component={Tpost} />}
      <Route component={() => <h1>Does not exist</h1>} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Fragment>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <HNavbar />
          <Routing />
        </Router>
      </UserContext.Provider>
    </Fragment>
  );
}

export default App;
