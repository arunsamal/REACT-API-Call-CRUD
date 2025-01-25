import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./component/Navbar";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
