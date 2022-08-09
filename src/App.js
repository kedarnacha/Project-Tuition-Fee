import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import laporan from "./component/Laporan"
// import gagal from "./pages/gagal"

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/laporan' component={laporan} />
    </Switch>
  );
}

export default App;