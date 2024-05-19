import { BrowserRouter as Router, Route ,Routes  } from "react-router-dom";
import Home from "./screens/home/home";
import Player from "./screens/player/player";
import Songs from "./screens/songs/songs";
import Login from "./screens/auth/login-signup";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/songs" element={<Songs/>} ></Route>
          <Route path="/player" element={<Player />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
      </Router>
  );
}

export default App;
