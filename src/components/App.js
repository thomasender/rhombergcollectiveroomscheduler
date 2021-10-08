import React from "react";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { LogIn } from "./LogIn";
import { PrivateRoute } from "./PrivateRoute";

export const App = () => {
  return (
    <Container
      className="bg-secondary d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div className="w-100" style={{ maxWidth: "80vw" }}>
        <Router>
          <AuthProvider>
            <DataProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />

                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={LogIn} />
              </Switch>
            </DataProvider>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
};
