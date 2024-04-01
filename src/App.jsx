import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { NewUserPage } from "./pages/new-user";
import { NotFound } from "./pages/not-found";
import { LoginUserPage } from "./pages/login-page";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<NewUserPage />} />
        <Route path="login" element={<LoginUserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
