import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { NewUserPage } from "./pages/new-user";
import { NotFound } from "./pages/not-found";
import { LoginUserPage } from "./pages/login-page";
import { UserPage } from "./pages/user-page";
import { useState } from "react";

function App() {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleFilteredPosts = (posts) => {
    setFilteredPosts(posts);
  };

  return (
    <>
      <Header handleFilteredPosts={handleFilteredPosts} />
      <Routes>
        <Route index element={<Home filteredPosts={filteredPosts} />} />
        <Route path="/register" element={<NewUserPage />} />
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/users/">
          <Route path=":username" element={<UserPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
