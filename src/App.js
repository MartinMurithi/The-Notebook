import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/Forms/Register";
import Login from "./Components/Forms/Login";
import Notes from "./Components/Notes/Notes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/Firebase";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isUserSignedIn = () => {
      const user = onAuthStateChanged(auth, (user) => {
        user ? navigate("/notes") : navigate("/");
      });
    };
    isUserSignedIn();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
}

export default App;
