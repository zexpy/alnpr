import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import About from "./pages/About";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Team from "./pages/Team";
import Upload from "./pages/Upload";
import VideoResult from "./pages/VideoResult";

function NotFound() {
  return (
    <div>
      <p>404</p>Error finding page
    </div>
  );
}
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/video-result" element={<VideoResult />} />
      </Routes>
    </Router>
  );
};

export default App;