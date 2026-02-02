import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/layout/Header.jsx";
import FAQ from "./pages/FAQ.jsx";
import Planning from "./pages/Planning.jsx";
{/*import Submission from "./pages/Submission.jsx";*/}

function AppRouter() {
  return (
    <Router>
          <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/planning" element={<Planning />} /> 
        {/*<Route path="/submission" element={<Submission />} />*/}
      </Routes>
    </Router>
  );
}

export default AppRouter;