import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { LogoutButton } from "./components/logout.button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Auth0-React Hello World.</p>
        <Button
          variant="contained"
          component={Link}
          to={"/profile"}
          // style={{ marginBlock: 20 }}
          className="Button-style"
        >
          Profile
        </Button>
        {<LogoutButton variant="contained" />}
        <Button
          variant="contained"
          color="success"
          component={Link}
          to={"/access-server"}
          style={{ margin: 10 }}
        >
          Server API
        </Button>
      </header>
    </div>
  );
}

export default App;
