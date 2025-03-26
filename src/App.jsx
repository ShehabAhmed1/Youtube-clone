import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Home } from "./assets/Pages/Home";
import { VideoPage } from "./assets/Pages/VideoPage";
import "./App.css";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/VideoPage" element={<VideoPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
