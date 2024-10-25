import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import { useSelector } from "react-redux";

function App() {
  let { uid } = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        {uid ? (
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect from="/" to="/admin/index" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
