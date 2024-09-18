import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import StartGame from "./components/StartGame/StartGame";
import InGame from "./components/InGame/InGame";
import Result from "./components/Result/Result";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartGame />} />
          <Route path="/game" element={<InGame />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
