import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
