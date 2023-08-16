import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UserPage from "./pages/user";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/users/:id" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
