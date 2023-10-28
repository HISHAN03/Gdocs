import Home from "../src/pages/home";
import Docs from "./pages/docs";
  
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Docs" element={<Docs />} />
        <Route path="/:documentName" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;























