import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import QuestionAnswer from "./components/Question";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <QuestionAnswer />
                <Items />
              </>
            }
          ></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
